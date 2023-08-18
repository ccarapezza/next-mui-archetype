import { Product, ProductCategory, ProductItem, Variation, VariationOption, sequelizeInstace } from '@/db';
import findAllSequelizePagination from '@/db/utils/pagination';
import { VariationDto } from '@/schemas/variation';
import { VariationOptionDto } from '@/schemas/variationOption';
import S3BucketUtil from '@/utils/S3BucketUtil';
import { NextRequest, NextResponse } from 'next/server'
import { QueryTypes } from 'sequelize';

export async function GET(request: NextRequest) {
    const id = parseInt(request.nextUrl.searchParams.get("id")!);

    const categoryParam = request.nextUrl.searchParams.get('category');
    const priceMinParam = request.nextUrl.searchParams.get('pricemin');
    const priceMaxParam = request.nextUrl.searchParams.get('pricemax');
    /*
    const talleParam = request.nextUrl.searchParams.get('talle');
    const colorParam = request.nextUrl.searchParams.get('color');
    */
   
   const categoryId = (await ProductCategory.findOne({ attributes: ['id'], where: { name: categoryParam } }))?.id;
   const priceMin = priceMinParam?parseInt(priceMinParam):undefined;
   const priceMax = priceMaxParam?parseInt(priceMaxParam):undefined;
   //obtain searchs for variants
   const variationsIdsSearchs = [];
   const variations: VariationDto[] = (await Variation.findAll({attributes: ['id', 'name']}))?.map((v) => v.toJSON<VariationDto>());
    for (const variation of variations) {
        const variationSearch = request.nextUrl.searchParams.get(variation.name.toLowerCase());
        const variationOption : VariationOptionDto | undefined = (await VariationOption.findOne({attributes: ['id'], where: {value: variationSearch}}))?.toJSON<VariationOptionDto>();

        if (variationOption) {
            variationsIdsSearchs.push(variationOption.id);
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
    if(priceMin){
        whereClauses.push('pi.price >= :minPrice');
    }
    if(priceMax){
        whereClauses.push('pi.price <= :maxPrice');
    }

    variationsIdsSearchs.forEach((variationSearch, index) => {        
        whereVariantClauses.push(`vo.id = :variationId-${index}`);
    });

    if(whereVariantClauses.length > 0){
        const variantWherer = "(".concat(whereVariantClauses.join(" or ")).concat(")");
        whereClauses.push(variantWherer);
    }

    let where = '';

    if(whereClauses.length > 0){
        where = " where ".concat(whereClauses.join(" and "));
    }

    const query = querySearch.concat(where);
    const replacements = {
        categoryId: categoryId,
        minPrice: priceMin,
        maxPrice: priceMax,
        ...variationsIdsSearchs.map((variationSearch, index) => ({[`variationId-${index}`]: variationSearch}))
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
    const resultSetGrouped = resultSet.reduce((acc: any, item: any) => {
        const product = acc.find((p: any) => p.id === item.id);
        if (product) {
            product.items.push({
                sku: item.items.sku,
                stock: item.items.stock,
                image: item.items.image,
                price: item.items.price
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
                    image: item.items.image,
                    price: item.items.price
                }]
            });
        }
        return acc;
    }, []);

    return NextResponse.json(resultSetGrouped);
}