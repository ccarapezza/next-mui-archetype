import { ProductService } from "@/services/ProductService";
import CarouselProducts from "./CarouselProducts";

const fetchProductData = async () => {
  return ProductService.search(null);
};

export default async function CarrouselProductServer() {

    const listProducts = await fetchProductData(); // TODO: Ver Loop infinito!
    const lista = listProducts.rows;

    return (  
        <CarouselProducts products={lista}/>
    )

}