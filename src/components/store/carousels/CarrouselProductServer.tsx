import { productService } from "@/services/ProductService";
import CarouselProducts from "./CarouselProducts";
import { FilterProduct } from "@/schemas/filterProduct";

const fetchProductData = async () => {
  const filters: FilterProduct = {
    category: null,
    priceMin: null,
    priceMax: null,
    variations: [],
}
  const products = await productService.searchByFilters(filters, 1, 10);
  return {
    totalItems: products.length,
    rows: products,
    totalPages: 1,
    currentPage: 1
}
};

export default async function CarrouselProductServer() {

    const listProducts = await fetchProductData(); // TODO: Ver Loop infinito!
    const lista = listProducts.rows;

    return (  
        <CarouselProducts products={lista}/>
    )

}