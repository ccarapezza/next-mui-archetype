//Service object for Product Sequelize Model

import { Product, ProductCategory, ProductItem } from "@/db";
import findAllSequelizePagination from "@/db/utils/pagination";
import S3BucketUtil from "@/utils/S3BucketUtil";
import { Op, WhereOptions } from "sequelize";

export const ProductService = {
    //Get all categories
    getAll: async () => {
        return await Product.findAll();
    },
    //Get a category by id
    getById: async (id: number) => {
        return await Product.findByPk(id);
    },
    //Get a category by name
    getByName: async (name: string) => {
        return await Product.findOne({
            where: { name: name },
        });
    },
    //Create a new category
    create: async (name: string) => {
        return await Product.create({ name: name });
    },
    //Update a category
    update: async (id: number, name: string) => {
        return await Product.update(
            { name: name },
            {
                where: { id: id },
            }
        );
    },
    //Delete a category
    delete: async (id: number) => {
        return await Product.destroy({
            where: { id: id },
        });
    },
    search: async (searchTerm: string | null, page: number = 1, size: number = 10) => {
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
    }
};