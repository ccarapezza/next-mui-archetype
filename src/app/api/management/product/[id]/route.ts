import { Product, ProductItem, Variation, VariationOption } from "@/db";
import S3BucketUtil from "@/utils/S3BucketUtil";
import { NextRequest, NextResponse } from "next/server";
import { Op } from 'sequelize';

export async function PUT(request: NextRequest, {params}: {params: {id: string}}) {
    const requestJSON = await request.json();
    console.log("Request PUT JSON", requestJSON.items);
    const productId = params.id;
    const product = await Product.findByPk(productId, {include: [
        {
            model: ProductItem,
            as: 'items',
            include: [
                {
                    model: VariationOption,
                    as: 'variationOptions',
                    attributes: ['id', 'value'],
                    include: [{
                        model: Variation,
                        as: 'variation',
                        attributes: ['id', 'name']
                    }]
                }
            ]
        }
    ]});
    product?.set({
        name: requestJSON.name,
        description: requestJSON.description,
        categoryId: requestJSON.categoryId,
    });

    requestJSON.items.forEach(async (productItem: any) => {
        const item = product?.items?.find((i: ProductItem) => i.id === productItem.id);
        
        if(item){
            const currentImages = item?.image;
            const newImages = productItem?.images?.filter((i: string) => !currentImages?.includes(i));
            if(newImages){
                for (const image of newImages) {
                    console.log("image-1", image);
                    try {
                        await S3BucketUtil.renameFile({oldKey: `${S3BucketUtil.FOLDERS.TEMP}/${image}`, newKey: `${S3BucketUtil.FOLDERS.PRODUCT_IMAGES}/${image}`});
                    } catch (error) {
                        console.log("TEMP", `${S3BucketUtil.FOLDERS.TEMP}/${image}`);
                        console.log("IMAGES", `${S3BucketUtil.FOLDERS.PRODUCT_IMAGES}/${image}`);
                        console.log("Error rename file", error);
                    }
                }
            }
            item.set({
                price: productItem.price,
                image: productItem.images?productItem.images:item.image,
            });
            await item?.save();
        }else{
            const newImages = productItem?.images;
            if(newImages){
                for (const image of newImages) {
                    console.log("image-2", image);
                    try {
                        await S3BucketUtil.renameFile({oldKey: `${S3BucketUtil.FOLDERS.TEMP}/${image}`, newKey: `${S3BucketUtil.FOLDERS.PRODUCT_IMAGES}/${image}`});
                    } catch (error) {
                        console.log("TEMP", `${S3BucketUtil.FOLDERS.TEMP}/${image}`);
                        console.log("IMAGES", `${S3BucketUtil.FOLDERS.PRODUCT_IMAGES}/${image}`);
                        console.log("Error rename file", error);
                    }
                }
            }
            const productItemCreated = await ProductItem.create({
                masterProductId: productId,
                stock: 0,
                sku: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),//TODO: Generar un SKU
                price: productItem.price,
                image: productItem.images?productItem.images?.join(","):null
            });

            const variationOptionsIds = productItem.variation;
            if (variationOptionsIds) {
                const variationOptions: VariationOption[] = await VariationOption.findAll({
                    where: {
                        id: {
                            [Op.in]: variationOptionsIds,
                        }
                    },
                });
                await productItemCreated.addVariationOptions(variationOptions);
            }
        }

    });

    //save product
    await product?.save();

    return NextResponse.json("Ok!");
}