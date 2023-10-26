'use client'
import { useEffect, useState } from "react";
import ProductImage from "@/components/store/pdp/product-image/ProductImage";
import ProductDescription from "@/components/store/pdp/ProductDescription";
import { ProductDto } from "@/schemas/product";
import { ProductItemDto } from "@/schemas/productItem";

export default function ProductMain(props: { product: ProductDto | null }) {
    const { product } = props;
    const [itemId, setItemId] = useState(0);
    const [selectedItem, setSelectedItem] = useState<any>({
        ...
        product?.items[0]
    });

    useEffect(() => {
        product?.items.forEach((item: ProductItemDto) => {
            if (item.id === itemId) {
                setSelectedItem(item)
                return item;

            }
        });
    }, [itemId, product]);

    return (
        <section>
            <div className="md:flex max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
                {/* Componente Imagenes */}
                <ProductImage images={selectedItem.images} productName={product?.name}/>
                {/* Componente Info Producto */}
                <ProductDescription product={product} setItemId={setItemId} selectedItem={selectedItem}/>
            </div>
        </section>
    )
}