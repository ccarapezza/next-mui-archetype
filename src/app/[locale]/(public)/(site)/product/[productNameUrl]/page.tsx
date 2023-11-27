import ProductMain from "@/components/store/pdp/ProductMain";
import { productService } from "@/services/ProductService";

const fetchProductData = async (id:number) => {
  return productService.getDtoById(id)
};

export default async function SiteProductPage(props: {params: { productNameUrl: number}}) {
  // Get ID from URL
  const id = props.params.productNameUrl; //TODO: Change to productNameUrl
  
  const product = await fetchProductData(id);

  return (
    <ProductMain product={product} />
  )
}