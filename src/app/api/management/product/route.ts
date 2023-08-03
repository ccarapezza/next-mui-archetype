import { NextRequest, NextResponse } from 'next/server'
import { Product, ProductItem, VariationOption } from '../../../../db';
import { ProductItem as ProductItemSchema } from '@/schemas/productItem';
import { Op } from 'sequelize';
import S3BucketUtil from '@/utils/S3BucketUtil';
import crypto from 'crypto';

interface FormDataField {
    name: string;
    value: string;
}

function formDataToJSON(formData: FormData): any {
    const result: any = {};

    const formDataArray: FormDataField[] = [];

    formData.forEach((value: any, key) => {
        if(!key.startsWith("file")) {
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
                if(arrayKey==="variation") {
                    currentObject[arrayKey][arrayIndex] = value;
                }else{
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
    const formData = await request.formData();
    const jsonObject = formDataToJSON(formData);
    console.log("formData", formData);
    console.log("JSON Object", jsonObject);
    console.log("Variants", jsonObject.items[0].variation);
    console.log("Price", jsonObject.items[0].price);

    let imageName: string | null = null;

    const file: File | null = formData.get('file') as unknown as File;
    if(file!=null){
        imageName = crypto.randomBytes(32).toString('hex');
        const uploadFileResponse = S3BucketUtil.uploadFile({
            file: file!,
            key: imageName
        });
        console.log("uploadFileResponse", uploadFileResponse);
    }

    const productCreated = await Product.create({
        name: jsonObject.name,
        description: jsonObject.description,
        categoryId: jsonObject.categoryId,
    });

    const productItems = [];
    jsonObject.items.forEach(async (item: ProductItemSchema) => {
        try {
            
            const productItemCreated = await ProductItem.create({
                masterProductId: productCreated.id,
                stock: 0,
                sku: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),//TODO: Generar un SKU
                price: item.price,
                image: imageName
            });
            productItems.push(productItemCreated);

            const variationOptionsIds = item.variation;
            console.log("ITEM:", item);
            console.log("variationOptionsIds", item.variation);
            if(variationOptionsIds){
                const variationOptions: VariationOption[] = await VariationOption.findAll({
                    where: {
                        id:{
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

    return NextResponse.json(formData);
}