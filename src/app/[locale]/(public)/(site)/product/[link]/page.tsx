import ProductMain from "@/components/store/pdp/ProductMain";
import { productService } from "@/services/ProductService";

const fetchProductData = async (link: string) => {
    return productService.getDtoByLink(link as string) 
};

export default async function SiteProductPage(props: { params: { link: string } }) {
    const product = await fetchProductData(props.params.link);
    
    return (
        <ProductMain product={product} />
    )
}