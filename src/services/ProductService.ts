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

//ProductService extends GenericService
export class ProductService extends GenericService<Product> {
    constructor() {
        super(Product);
    }
    getDtoById = async (id: number | string): Promise<ProductDto|null> => {
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
                if (product.dataValues.items[i].dataValues.image) {
                    const imagesKeys = product.dataValues.items[i].dataValues.image.split(',');
                    //obtain images url from s3 bucket
                    const images = []
                    for (const image of imagesKeys) {
                        images.push(await S3BucketUtil.getSignedUrlByKey({key: image}))
                    }
                    item.images = images;
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
            attributes: ['id', 'name', 'description', 'categoryId'],
            include: [
                'category',
                {
                    model: ProductItem,
                    as: 'items',
                    include: ['variationOptions']
                }
            ],
            where
        });

        for (const product of products.rows) {
            const productModel = product as Product;
            for (const item of productModel.items) {
                const itemModel = item as ProductItem;
                if (itemModel.image) {
                    itemModel.image = await S3BucketUtil.getSignedUrlByKey({ key: itemModel.image! });
                }
            }
        }

        return products;
    };
    searchByFilters = async (filters: FilterProduct, page: number = 1, size: number = 10) => {
        //TODO: Enviar directamente el id de la categoria, por ahora se busca por el nombre
        const categoryId = filters.category?(await ProductCategory.findOne({ attributes: ['id'], where: { name: filters.category } }))?.id:null;

        //obtain searchs for variants
        const variationsIdsSearchs = [];
        const variations: VariationDto[] = (await Variation.findAll({attributes: ['id', 'name']}))?.map((v) => v.toJSON<VariationDto>());
        for (const variation of variations) {
            const variationSearch = filters.variations?.find((v) => v.key.toLowerCase() === variation.name.toLowerCase())?.values;
            console.log("variationSearch", variationSearch)

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
        const whereVariantClauses: string[] = [];

        if(categoryId){
            whereClauses.push('pc.id = :categoryId');
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
            categoryId: categoryId,
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
                    sku: item.items.sku,
                    stock: item.items.stock,
                    images: item.items.image?item.items.image.split(','):[],
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
                        sku: item.items.sku,
                        stock: item.items.stock,
                        images: item.items.image?item.items.image.split(','):[],
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
                    item.images = await Promise.all(item.images.map(async (image) => {
                        return await S3BucketUtil.getSignedUrlByKey({key: image});
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