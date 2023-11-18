//Service object for Product Sequelize Model
import { Product, ProductCategory, ProductItem, Variation, VariationOption, sequelizeInstace } from "@/db";
import findAllSequelizePagination from "@/db/utils/pagination";
import S3BucketUtil from "@/utils/S3BucketUtil";
import { Op, QueryTypes, WhereOptions } from "sequelize";
import { GenericService } from "./GenericService";
import { ProductDto } from "@/schemas/product";
import { VariationDto } from "@/schemas/variation";
import { VariationOptionDto } from "@/schemas/variationOption";

import { FilterProduct } from "@/schemas/filterProduct";
import { ProductItemDto } from "@/schemas/productItem";

//ProductService extends GenericService
export class ProductService extends GenericService<Product> {
    constructor() {
        super(Product);
    }
    getDtoById = async (id: number | string, imageDetail: boolean = false): Promise<ProductDto|null> => {
        const product: Product | null = await Product.findOne({
            where: { id },
            attributes: ['id', 'name', 'description', 'createdAt', 'updatedAt'],
            include: [
                ProductCategory,
                {
                    attributes: ['id', 'sku', 'stock', 'image', 'price'],
                    model: ProductItem,
                    include: [
                        {
                            attributes: ['id', 'value'],
                            model: VariationOption,
                            include: [{
                                model: Variation,
                                attributes: ['id', 'name']
                            }]
                        }
                    ]
                }
            ]
        });

        let productDto = null;
    
        if (product) {
            productDto = product.toJSON();
            for (let i = 0; i < productDto.items.length; i++) {
                const item = productDto.items[i];
                if (item.image) {
                    const imagesKeys = item.image;
                    const images = []
                    const imagesDetail = []
                    for (const image of imagesKeys) {
                        const urlImage = await S3BucketUtil.getSignedUrlByKey({key: image, folder: S3BucketUtil.FOLDERS.PRODUCT_IMAGES});
                        images.push(urlImage)
                        if(imageDetail){
                            imagesDetail.push({
                                key: image,
                                url: urlImage
                            });
                        }
                    }
                    item.images = images;
                    if(imageDetail){
                        item.imagesDetail = imagesDetail;
                    }
                    delete item.image;
                }
            }
        }
        return productDto;
    };
    search = async (searchTerm: string | null, page: number = 1, size: number = 10) => {
        let where: WhereOptions | undefined = undefined;
        const whereConditions = [];
        if (searchTerm) {
            whereConditions.push({
                name: {
                    [Op.like]: `%${searchTerm}%`
                }
            });
            const categoriesIds = await ProductCategory.findAll({
                attributes: ['id'],
                where: {
                    name: {
                        [Op.like]: `%${searchTerm}%`
                    }
                }
            });
            if (categoriesIds.length > 0) {
                whereConditions.push({
                    categoryId: {
                        [Op.in]: categoriesIds.map(category => category.id)
                    }
                });
            }
        }

        if (whereConditions.length > 0) {
            where = {
                [Op.or]: whereConditions
            }
        }

        const products = await findAllSequelizePagination({
            model: Product,
            page: page,
            size: size,
            attributes: ['id', 'name', 'categoryId'],
            include: [
                'category',
                {
                    model: ProductItem,
                    as: 'items',
                    include: [
                        {
                            model: VariationOption,
                            as: 'variationOptions',
                            attributes: ['id', 'value'],
                            include: [{
                                model: Variation,
                                as: 'variation',
                                attributes: ['id', 'name']
                            }]
                        }
                    ]
                }
            ],
            where
        });

        for (const product of products?.rows) {
            const productDto = product as any;
            for (let i = 0; i < productDto.items.length; i++) {
                const item = productDto.items[i];
                if (item.image) {
                    const imagesKeys = item.image;
                    const images = []
                    for (const image of imagesKeys) {
                        const urlImage = await S3BucketUtil.getSignedUrlByKey({key: image, folder: S3BucketUtil.FOLDERS.PRODUCT_IMAGES});
                        images.push(urlImage)
                    }
                    item.images = images;
                    delete item.image;
                }
            }
            delete productDto?.collection_products;
        }

        return products;
    };
    searchByFilters = async (filters: FilterProduct, page: number = 1, size: number = 10) => {
        //TODO: Enviar directamente el id de la categoria, por ahora se busca por el nombre
        if(isNaN(parseInt(filters.category!)) && filters.category){
            throw new Error('Invalid category id');
        }

        //obtain categoryId
        const categoryId = filters.category;

        const categoriesSearch = `WITH RECURSIVE generation AS (
            SELECT id, name, parentId
            FROM product_category
            WHERE parentId IS NULL
        UNION ALL
            SELECT child.id, child.name, child.parentId
            FROM product_category child
            JOIN generation g ON g.id = child.parentId
        )
        
        SELECT g.id
        FROM generation g
        JOIN product_category parent
        ON g.parentId = parent.id and parent.id = :parentCategoryId`

        const categoriesResultSet = await sequelizeInstace.query(
            categoriesSearch,
            {
                replacements: {
                    parentCategoryId: categoryId
                },
                type: QueryTypes.SELECT,
                nest: true,
            }
        );

        const categoriesFilter = categoryId?[categoryId].concat(categoriesResultSet.map((c: any) => c.id)):null;
        
        //obtain searchs for variants
        const variationsIdsSearchs = [];
        
        const variations: VariationDto[] = (await Variation.findAll({
            attributes: ['id', 'name'],
            where: {
                name: {
                    [Op.in]: filters.variations?.map((v) => v.key)
                }
            },
        }))?.map((v) => v.toJSON<VariationDto>());

        for (const variation of variations) {
            const variationSearch = filters.variations?.find((v) => v.key.toLowerCase() === variation.name.toLowerCase())?.values;

            if (variationSearch) {
                for(const variationValue of variationSearch){
                    const variationOption : VariationOptionDto | undefined = (await VariationOption.findOne({attributes: ['id'], where: {value: variationValue}}))?.toJSON<VariationOptionDto>();
                    if(variationOption){
                        variationsIdsSearchs.push(variationOption.id);
                    }
                }
            }
        }

        //Build query
        const querySearch = `SELECT distinct p.id, p.name, p.description, p.createdAt, p.updatedAt, pc.id as 'category.id', pc.name as 'category.name', pi.sku as 'items.sku', pi.stock as 'items.stock', pi.image as 'items.image', pi.price as 'items.price' FROM product as p
        LEFT JOIN product_category as pc on p.categoryId = pc.id
        LEFT JOIN product_item as pi on p.id = pi.masterProductId
        LEFT JOIN product_configuration as pconf on pi.id = pconf.productItemId
        LEFT JOIN variation_option as vo on pconf.variationOptionId = vo.id
        LEFT JOIN variation_option as vopt on pconf.variationOptionId = vopt.id`;
        
        const whereClauses: string[] = [];

        if(categoriesFilter){
            whereClauses.push('pc.id in (:categoriesFilter)');
        }
        if(filters.priceMin){
            whereClauses.push('pi.price >= :minPrice');
        }
        if(filters.priceMax){
            whereClauses.push('pi.price <= :maxPrice');
        }

        if(variationsIdsSearchs?.length > 0){
            whereClauses.push('vo.id IN(:variationsIds)');
        }

        let where = '';

        if(whereClauses.length > 0){
            where = " where ".concat(whereClauses.join(" and "));
        }

        const query = querySearch.concat(where);
        const replacements = {
            categoriesFilter: categoriesFilter,
            minPrice: filters.priceMin,
            maxPrice: filters.priceMax,
            variationsIds: variationsIdsSearchs
        };

        const resultSet = await sequelizeInstace.query(
            query,
            {
                replacements,
                type: QueryTypes.SELECT,
                nest: true,
            }
        );
        
        //Group by product
        const resultSetGrouped = resultSet.reduce((acc: ProductDto[], item: any) => {
            const product = acc.find((p: any) => p.id === item.id);

            if (product) {
                product.items.push({
                    id: item.items.id,
                    sku: item.items.sku,
                    stock: item.items.stock,
                    images: item.items.image?item.items.image:[],
                    price: item.items.price,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                });
            } else {
                acc.push({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    category: {
                        id: item.category.id,
                        name: item.category.name,
                    },
                    items: [{
                        id: item.items.id,
                        sku: item.items.sku,
                        stock: item.items.stock,
                        images: item.items.image?item.items.image:[],
                        price: item.items.price,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt,
                    }]
                });
            }
            return acc;
        }, [] as ProductDto[]);

        //set S3 images to images array prop
        for (const product of resultSetGrouped) {
            for (const item of product.items) {
                if (item.images.length > 0) {
                    
                    item.images = await Promise.all(item.images?.map(async (image) => {
                        return await S3BucketUtil.getSignedUrlByKey({key: image as string, folder: S3BucketUtil.FOLDERS.PRODUCT_IMAGES});
                    }));
                } else {
                    item.images = [];
                }
            }
        }
        
        return resultSetGrouped;
    }
};

//ProductService as a singleton
export const productService = new ProductService();