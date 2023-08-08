//Service object for ProductCategory Sequelize Model

import { ProductCategory } from "@/db";
import { ProductCategoryDto } from "@/schemas/category";
import { Op, WhereOptions } from "sequelize";

export const ProductCategoryService = {
    //Get all categories
    getAll: async () => {
        return await ProductCategory.findAll();
    },
    //Get a category by id
    getById: async (id: number) => {
        return await ProductCategory.findByPk(id);
    },
    //Get a category by name
    getByName: async (name: string) => {
        return await ProductCategory.findOne({
            where: { name: name },
        });
    },
    //Create a new category
    create: async (name: string) => {
        return await ProductCategory.create({ name: name });
    },
    //Update a category
    update: async (id: number, name: string) => {
        return await ProductCategory.update(
            { name: name },
            {
                where: { id: id },
            }
        );
    },
    //Delete a category
    delete: async (id: number) => {
        return await ProductCategory.destroy({
            where: { id: id },
        });
    },
    searchCategoryTree: async (searchTerm: string | null) => {
        let where: WhereOptions | undefined = undefined;
        if (searchTerm) {
            where = {
                name: {
                    [Op.like]: `%${searchTerm}%`
                }
            }
        }
        const productCategory = await ProductCategory.findAll({
            attributes: ['id', 'name', 'parentId'],
        });

        const productCategoriesDto: ProductCategoryDto[] = productCategory.map((category) => {
            const categoryDto: ProductCategoryDto = {
                id: category.id,
                name: category.name,
                parentId: category.parentId ? category.parentId : null,
                parent: null,
                children: []
            }
            return categoryDto;
        })

        //convert to tree
        const productTree: ProductCategoryDto[] = productCategoriesDto.reduce((tree, category) => {
            if (category.parentId) {
                const parent = productCategoriesDto.find(c => c.id === category.parentId);
                if (parent) {
                    if (!parent.children) {
                        parent.children = [];
                    }
                    parent.children.push(category);
                }
            } else {
                tree.push(category);
            }
            return tree;
        }, [] as ProductCategoryDto[]);

        return productTree;
    }
};