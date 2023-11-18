//Service object for Collection Sequelize Model
import { Collection, Product, ProductItem } from "@/db";
import findAllSequelizePagination from "@/db/utils/pagination";
import { Op, WhereOptions } from "sequelize";
import { GenericService } from "./GenericService";
import S3BucketUtil from "@/utils/S3BucketUtil";
import { ProductItemDto } from "@/schemas/productItem";
import { ProductDto } from "@/schemas/product";

//CollectionService extends GenericService
export class CollectionService extends GenericService<Collection> {
    constructor() {
        super(Collection);
    }
    search = async (searchTerm: string | null, page: number = 1, size: number = 10) => {
        let where : WhereOptions | undefined = undefined;
        if (searchTerm) {
            where = {
                name: {
                    [Op.like]: `%${searchTerm}%`
                }
            }
        }
        const collections = await findAllSequelizePagination({
            model: Collection,
            page: page,
            size: size,
            attributes: ['id', 'name'],
            include: ['products'],
            where
        });

        return collections;
    }
    createCollection = async (name: string, productsIds: number[]) => {
        //check if products exists
        const products = await Product.count({where: {id: productsIds}});
        if (products !== productsIds.length) {
            throw new Error("Some products do not exist");
        }
        const collection = await Collection.create({name});
        await collection.$set('products', productsIds);
        return collection;
    }
    updateCollection = async (id: number, name: string, productsIds: number[]) => {
        //check if products exists
        const products = await Product.count({where: {id: productsIds}});
        if (products !== productsIds.length) {
            throw new Error("Some products do not exist");
        }
        const collection = await Collection.findByPk(id);
        if (!collection) {
            throw new Error("Collection does not exist");
        }
        await collection.update({name});
        await collection.$set('products', productsIds);
        return collection;
    }
    getDtoById = async (id: number | string): Promise<Object|null> => {
        const collection = await Collection.findByPk(id, {attributes: ['id', 'name'], include: [
            {
                model: Product,
                attributes: ['id', 'name', 'categoryId'],
                include: [
                    'category',
                    {
                        model: ProductItem,
                        as: 'items',
                        attributes: ['id', 'sku', 'stock', 'image', 'price'],
                    },
                ],
            },
        ]});
        const collectionObj = collection?.toJSON();
        const products = [];

        for (const product of collectionObj?.products) {
            const productDto = product;
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
            products.push(productDto);
        }

        return collectionObj;
    }
};

//CollectionService as a singleton
export const collectionService = new CollectionService();