import { Product, ProductCategory, ProductItem } from '@/db';
import findAllSequelizePagination from '@/db/utils/pagination';
import S3BucketUtil from '@/utils/S3BucketUtil';
import { NextRequest, NextResponse } from 'next/server'
import { Op, WhereOptions } from 'sequelize';

export async function GET(request: NextRequest) {
    const page = parseInt(request.nextUrl.searchParams.get("page")!) || 1;
    const size = parseInt(request.nextUrl.searchParams.get("size")!) || 10;
    const searchTerm = request.nextUrl.searchParams.get("search");
    let where : WhereOptions | undefined = undefined;
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
    console.log(products, null, 2);

    for (const product of products.rows) {
        const productModel = product as Product;
        for (const item of productModel.items) {
            const itemModel = item as ProductItem;
            if(itemModel.image){
                itemModel.image = await S3BucketUtil.getSignedUrlByKey({ key: itemModel.image! });
            }
        }
    }
           
    return NextResponse.json(products);
}