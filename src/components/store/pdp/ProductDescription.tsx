'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SkuSelector from "./sku-selector/SkuSelector"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { CartContext } from "../context/MiniCartContext";
import PriceFormatting from "@/components/management/product/PriceFormatting";
import { Product } from "@/schemas/product";
import ProductHeader from "./ProductHeader";

// const esteProducto = {
//   name: "Random Name #10",
//   description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam totameos iusto repellat blanditiis voluptate aspernatur, quae nemo exercitationem cum debitis!",
//   listPrice: 100,
//   specialPrice: 50,
//   sku: '012346',
//   quantity: 1,
//   urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
//   urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
//   productNameUrl: 'product-name-10'
// }

type ProductToCart = {
  product: Product,
  quantity: number
};



export default function ProductDescription(props: { product: Product }) {

  const { product } = props;
  const { items, name, id } = product;

  const productToCart: ProductToCart = {
    product: product,
    quantity: 1
  }

  const { addProduct } = useContext(CartContext)
  const [ quantity, setQuantity ] = useState(productToCart.quantity);
  console.log('quantity', quantity);
  

  const addToCart = () => {
    // addProduct(
    //   {
    //     ...productToCart,
    //     quantity: quantity
    //   }
    // )
  }

  return (
    <div className="relative mt-4 w-full md:w-1/2 md:ml-4">
      <div>
        <ProductHeader product={product} />
        <SkuSelector />
      </div>

      <div>
        <div className="block gap-2 md:flex">
          <div className="flex justify-around md:justify-normal items-center mb-4 md:mb-0 border border-gray-200 rounded w-full md:w-[100px]">
            <button
              type="button"
              className="w-8 h-8 leading-10 text-gray-600 transition hover:opacity-75"
              onClick={() => {
                setQuantity(quantity - 1)
               }}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>

            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => {setQuantity(parseInt(e.target.value))}}
              className="h-8 w-10 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
            />

            <button
              type="button"
              className="w-8 h-8 leading-10 text-gray-600 transition hover:opacity-75"
              onClick={() => {
                setQuantity(quantity + 1)
               }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <button
            className="w-full rounded bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-quaternary hover:bg-tertiary transition"
            onClick={() => {
              addToCart()
            }}
          >
            Agregar al Carrito!
          </button>

        </div>
      </div>
    </div>
  )
}