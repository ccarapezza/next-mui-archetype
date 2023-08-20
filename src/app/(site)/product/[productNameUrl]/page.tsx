import ProductImage from "@/components/store/pdp/product-image/ProductImage";
import ProductDescription from "@/components/store/pdp/ProductDescription";
import { productService } from "@/services/ProductService";

const fetchProductData = async () => {
  return productService.getDtoById(2)
};

export default async function SiteProductPage() {

  const product = await fetchProductData();
  console.log('Producto!', product);
  
  return (
    <section>
      <div className="md:flex max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        {/* Componente Imagenes */}
        <ProductImage images={product?.items[0].images}/>
        {/* Componente Info Producto */}
        <ProductDescription product={product}/>
      </div>
    </section>
  )
}