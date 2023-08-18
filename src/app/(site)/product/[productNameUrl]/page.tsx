'use client';
import ProductImage from "@/components/store/pdp/product-image/ProductImage";
import ProductDescription from "@/components/store/pdp/ProductDescription";

// const esteProducto = {
//   name: "Random Name #10",
//   description: "loremp ipsum dolor sit amet",
//   listPrice: 100,
//   specialPrice: 50,
//   sku: '012346',
//   quantity: 1,
//   urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
//   urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
//   productNameUrl: 'product-name-10'
// }

const testProduct = {
  id: 2,
  name: "Remera Mujer",
  description: "Narda remera!",
  categoryId: 2,
  category: {
    id: 2,
    name: "Remera",
    parentId: 1,
    createdAt: "2023-08-13T20:24:04.000Z",
    updatedAt: "2023-08-13T20:24:04.000Z"
  },
  items: [
    {
      id: 2,
      sku: "5lpg41b71s32fsqhp91bn2",
      stock: 0,
      image: 
        [
          'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+1',
          'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+2',
          'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+3',
          'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+4',
          'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+5'
        ],
      price: 12000,
      masterProductId: 2,
      variationOptions: [
        {
          id: 1,
          value: "S",
          variationId: 1,
        },
        {
          id: 4,
          value: "#fff",
          variationId: 2,
        }
      ]
    },
    {
      id: 3,
      sku: "p2om0zgbrb1e96wxpdu",
      stock: 0,
      image: 
        [
          'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+1',
          'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+2',
          'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+3',
          'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+4',
          'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+5'
        ],
      price: 12000,
      masterProductId: 2,
      variationOptions: [
        {
          id: 2,
          value: "M",
          variationId: 1,
        },
        {
          id: 4,
          value: "#fff",
          variationId: 2,
        }
      ]
    },
    {
      id: 4,
      sku: "h4oup1phtdggztf578n5w",
      stock: 0,
      image: 
        [
          'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+1',
          'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+2',
          'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+3',
          'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+4',
          'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+5'
        ],
      price: 12000,
      masterProductId: 2,
      variationOptions: [
        {
          id: 1,
          value: "S",
          variationId: 1,
        },
        {
          id: 4,
          value: "#fff",
          variationId: 2
        }
      ]
    }
  ]
}

export default function SiteProductPage() {

  return (
    <section>
      <div className="md:flex max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        {/* Componente Imagenes */}
        <ProductImage images={testProduct.items[0].image}/>
        {/* Componente Info Producto */}
        <ProductDescription product={testProduct}/>
      </div>
    </section>
  )
}