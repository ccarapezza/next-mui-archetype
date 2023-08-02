import { ProductCategory } from '@/db';
import { ProductCategoryDto } from '@/schemas/category';
import { NextRequest, NextResponse } from 'next/server'
import { Op, WhereOptions } from 'sequelize';

export async function GET(request: NextRequest) {
    console.log("search", request.nextUrl.searchParams.get("search"))
    const searchTerm = request.nextUrl.searchParams.get("search");
    let where : WhereOptions | undefined = undefined;
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

    const productCategoriesDto : ProductCategoryDto[] = productCategory.map((category) => {
        const categoryDto : ProductCategoryDto = {
            id: category.id,
            name: category.name,
            parentId: category.parentId?category.parentId:null,
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

    return NextResponse.json(productTree);
}