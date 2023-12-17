import { NextRequest, NextResponse } from 'next/server'
import { Product, ProductItem, VariationOption } from '../../../../db';
import { Op } from 'sequelize';
import S3BucketUtil from '@/utils/S3BucketUtil';
import StringUtils from '@/utils/StringUtils';

export async function POST(request: NextRequest) {
    const requestJSON = await request.json();
    console.log("Request JSON", requestJSON);

    //check if product link already exists and add a number to the end
    const linkBase = StringUtils.sanitizeTextAndReplaceSpaces(requestJSON.name);

    let link = linkBase;
    let count = 0;
    while (await Product.findOne({ where: { link } })) {
        link = `${linkBase}-${++count}`;
    }

    const productCreated = await Product.create({
        name: requestJSON.name,
        link: link,
        description: requestJSON.description,
        categoryId: requestJSON.categoryId,
    });

    const productImages = requestJSON.items.map((item: { images: string[]; }) => item.images);
    productImages.forEach((image: string[]) => {
        if (image && image.length > 0) {
            image.forEach(async (i) => {
                try {
                    await S3BucketUtil.renameFile({ oldKey: `${S3BucketUtil.FOLDERS.TEMP}/${i}`, newKey: `${S3BucketUtil.FOLDERS.PRODUCT_IMAGES}/${i}` });
                    await S3BucketUtil.createThumbnail({ key: i, folder: S3BucketUtil.FOLDERS.PRODUCT_IMAGES });
                } catch (error) {
                    console.log("Error rename file", error);
                }
            });
        }
    });

    if(productImages){
        for (const image of productImages) {
            try {
                await S3BucketUtil.renameFile({oldKey: `${S3BucketUtil.FOLDERS.TEMP}/${image}`, newKey: `${S3BucketUtil.FOLDERS.PRODUCT_IMAGES}/${image}`});
            } catch (error) {
                console.log("Error rename file", error);
            }
        }
    }
    
    const productItems = [];
    requestJSON.items.forEach(async (item: { price: any; images: any[]; variation: any; }) => {
        try {
            const productItemCreated = await ProductItem.create({
                masterProductId: productCreated.id,
                stock: 0,
                sku: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),//TODO: Generar un SKU
                price: item.price,
                image: item.images?item.images:null
            });
            productItems.push(productItemCreated);

            const variationOptionsIds = item.variation;
            console.log("ITEM:", item);
            console.log("variationOptionsIds", item.variation);
            if (variationOptionsIds) {
                const variationOptions: VariationOption[] = await VariationOption.findAll({
                    where: {
                        id: {
                            [Op.in]: variationOptionsIds,
                        }
                    },
                });
                console.log("Variation Options", variationOptions);
                await productItemCreated.addVariationOptions(variationOptions);
            }

            console.log("Variation Options finished");

        } catch (error) {
            console.log("Error!!", error)
        }

        //Se relacionan las variaciones posibles al producto
    });
    
    return NextResponse.json("Ok!");
}