import { Product, ProductCategory, ProductItem, Variation, VariationOption } from '@/db';
import { ProductDto } from '@/schemas/product';
import S3BucketUtil from '@/utils/S3BucketUtil';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {

    //obtain product by id
    const product: Product | null = await Product.findOne({
        where: { id: params.id },
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

    if (product) {
        const productDto = product.toJSON();
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
        return NextResponse.json(productDto as ProductDto);
    }

    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
}