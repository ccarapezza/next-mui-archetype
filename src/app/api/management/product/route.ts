import { NextRequest, NextResponse } from 'next/server'

interface FormDataField {
    name: string;
    value: string;
}

function formDataToJSON(formData: FormData): any {
    const result: any = {};

    const formDataArray: FormDataField[] = [];

    formData.forEach((value: any, key) => {
        formDataArray.push({ name: key, value });
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
              currentObject[arrayKey][arrayIndex] = {};
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
    console.log("JSON Object", jsonObject);

    return NextResponse.json(formData);
}