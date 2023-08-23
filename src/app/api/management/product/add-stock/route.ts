import { ProductItem } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const { id, stock } = await request.json();

    try{
        //get product item by id and update stock
        const productItem = await ProductItem.findOne({
            where: {
                id: id
            }
        });

        if(!productItem){
            return NextResponse.json({ error: "Product not found!" }, { status: 400 });
        }
        
        productItem.stock = productItem.stock+stock;

        const productUpdated = await productItem.save();

        return NextResponse.json({product: productUpdated}, { status: 200 });
    } catch (error: any) {
        console.log("error", error);
        //return a generic error
        return NextResponse.json({ error: "Error updating stock!" }, { status: 400 });
    }
}