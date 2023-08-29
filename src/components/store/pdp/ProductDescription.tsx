'use client'
import { useContext, useState } from "react";
import { CartContext } from "../context/MiniCartContext";
import { ProductDto, ProductToCart } from "@/schemas/product";
import SkuSelector from "./sku-selector/SkuSelector"
import ProductHeader from "./ProductHeader";
import { ProductItemDto } from "@/schemas/productItem";
import QuantitySelector from "./QuantitySelector";



export default function ProductDescription(props: { product: ProductDto | null, setItemId: (itemId: number) => void, selectedItem: ProductItemDto }) {
  // Props
  const { product, setItemId, selectedItem } = props;
  const items = product?.items ? product.items : [];

  // Product Available
  const [productAvailable, setProductAvailable] = useState<boolean>(false);

  const { addProduct } = useContext(CartContext)
  const [quantity, setQuantity] = useState(1);

  const variationsArray = (selectedItem?.variationOptions || [])
  .map((item: any) => ({
    name: item?.variation?.name,
    value: item?.value
  }));

  // Assemble product to go to the minicart
  const productToCart: ProductToCart = {
    productId: product?.id ? product.id : 0,
    name: product?.name ? product.name : '',
    quantity: quantity,
    price: selectedItem?.price ? selectedItem.price : 0,
    image: selectedItem?.images?.[0] ? selectedItem.images[0] : '',
    itemId: selectedItem?.id ? selectedItem.id : 0,
    variations: variationsArray,
  }

  return (
    <div className="relative mt-4 w-full md:w-1/2 md:ml-4">
      <div>
        <ProductHeader product={product} selectedItem={selectedItem} />
        <SkuSelector items={items} setProductAvailable={setProductAvailable} setItemId={setItemId} />
      </div>

      <div>
        <div className="block gap-2 md:flex">
          {/* QuantitySelector */}
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          {/* Agregar al Carrito */}
          {
            !productAvailable ?
              <button
                className="w-full rounded bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition disabled:bg-gray-300"
                disabled={!productAvailable}
              >
                No Disponible
              </button>
              :
              <button
                className="w-full rounded bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-tertiary transition"
                onClick={() => addProduct({ ...productToCart })}
              >
                Agregar al Carrito!
              </button>
          }
        </div>
      </div>
    </div>
  )
}