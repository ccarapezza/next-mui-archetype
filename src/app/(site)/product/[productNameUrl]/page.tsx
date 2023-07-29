'use client';
import { useContext } from "react";
import { CartContext } from "@/components/store/context/MiniCartContext";
import { Product } from "@/schemas/product";
import ProductImage from "@/components/store/pdp/ProductImage";
import ProductDescription from "@/components/store/pdp/ProductDescription";

const esteProducto = {
  name: "Random Name #10",
  description: "loremp ipsum dolor sit amet",
  listPrice: 100,
  specialPrice: 50,
  sku: '012346',
  quantity: 1,
  urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
  urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
  productNameUrl: 'product-name-10'
}

// const otroProducto: Product = {
//   name: "Random Name #10",
//   category: "Random Category",
//   description: "Random Description",
//   items: [
//     {
//       price: 200,
//       // SKU: '012345',
//       image: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
//       variation: [
//         {
//           name: "Talle",
//           value: "S"
//         },
//         {
//           name: "Color",
//           value: "#fff"
//         }
//       ]
//     },
//     {
//       price: 200,
//       // SKU: '012346',
//       image: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
//       variation: [
//         {
//           name: "Talle",
//           value: "M"
//         },
//         {
//           name: "Color",
//           value: "#000"
//         }
//       ]
//     }
//   ]
// };

export default function () {

  const { addProduct } = useContext(CartContext)

  const addToCart = () => {
    addProduct(esteProducto)
  }

  return (
    <section>
      <div className="md:flex max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        {/* Componente Imagenes */}
        <ProductImage />
        {/* Componente Info Producto */}
        <ProductDescription />
      </div>
    </section>
  )
}