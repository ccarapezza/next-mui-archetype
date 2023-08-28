import { Product, ProductCategory, ProductItem } from '@/db';
import findAllSequelizePagination from '@/db/utils/pagination';
import { ProductDto } from '@/schemas/product';
import { ProductItemDto } from '@/schemas/productItem';
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

    for (const product of products.rows) {
        const productModel = product.toJSON<Product>();
        const productDto = product.toJSON<ProductDto>();

        for(let i=0;i<productDto.items.length;i++){
            const images = productModel.items[i].image?(productModel.items[i].image?.split(",")):[];
            if(images && images?.length!>0){
                for (let j = 0; j < images?.length!; j++) {
                    images[j] = await S3BucketUtil.getSignedUrlByKey({ key: images[j] });
                }
                productDto.items[i].images = images;
            }
        }
    }

    console.log("··#################",products.rows);
           
    return NextResponse.json(products);
}