import { NextRequest, NextResponse } from 'next/server'
import { Product, ProductItem, VariationOption } from '../../../../db';
import { Product as ProductInput } from '@/schemas/product';
import { Op } from 'sequelize';
import S3BucketUtil from '@/utils/S3BucketUtil';
import crypto from 'crypto';
import { it } from 'node:test';

interface FormDataField {
    name: string;
    value: string;
}

function formDataToJSON(formData: FormData): any {
    const result: any = {};

    const formDataArray: FormDataField[] = [];

    formData.forEach((value: any, key) => {
        if (!key.startsWith("files")) {
            formDataArray.push({ name: key, value });
        }
    });

    formDataArray.forEach((field) => {
        const { name, value } = field;
        const keys: string[] = name.split('.');
        let currentObject: any = result;

        for (let i = 0; i < keys.length; i++) {
            const key: string = keys[i];
            const isArray: boolean = /\d+/.test(keys[i + 1]);

            if (isArray) {
                const arrayKey: string = keys[i];
                const arrayIndex: number = parseInt(keys[i + 1], 10);

                if (!currentObject[arrayKey]) {
                    currentObject[arrayKey] = [];
                }

                if (i === keys.length - 1) {
                    currentObject[arrayKey][arrayIndex] = value;
                } else {
                    if (!currentObject[arrayKey][arrayIndex]) {
                        if (arrayKey === "variation") {
                            currentObject[arrayKey][arrayIndex] = value;
                        } else {
                            currentObject[arrayKey][arrayIndex] = {};
                        }
                    }
                    currentObject = currentObject[arrayKey][arrayIndex];
                    i++; // Skip the array index since it has been processed
                }
            } else {
                if (!currentObject[key]) {
                    currentObject[key] = {};
                }

                if (i === keys.length - 1) {
                    currentObject[key] = value;
                } else {
                    currentObject = currentObject[key];
                }
            }
        }
    });

    return result;
}

export async function POST(request: NextRequest) {
    const requestJSON = await request.json();
    console.log("Request JSON", requestJSON);

    const productCreated = await Product.create({
        name: requestJSON.name,
        description: requestJSON.description,
        categoryId: requestJSON.categoryId,
    });

    //move temp images to product folder
    const images: string[] | undefined = requestJSON.items.map((item: { images: string[]; }) => item.images).reduce((acc: string[], val: string[]) =>{
        if(val&&val.length>0){
            acc?.concat(val);
        }
        return acc;
    }, [] as string[]);

    if(images){
        for (const image of images) {
            await S3BucketUtil.renameFile({oldKey: `temp/${image}`, newKey: image});
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
                image: item.images?item.images?.join(","):null
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




    /*
        {
            name: 'xcfxf',
            description: 'dxf',
            category: 'Hombre',
            items: [
                {
                    variation: [
                        { id: 4, name: 'Talle', value: 'S' },
                        { id: 5, name: 'Color', value: '#fff' }
                    ],
                    price: '25431654'
                }
            ]
        }
    */



    /*
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const path = `/tmp/${file.name}`
    await writeFile(path, buffer)
    console.log(`open ${path} to see the uploaded file`)

    console.log("IMAGE Object", formData.get("file"));
    */

    return NextResponse.json("Ok!");
}