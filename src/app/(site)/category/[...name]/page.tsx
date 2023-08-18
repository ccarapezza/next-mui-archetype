import ProductListMain from '@/components/store/plp/ProductListMain';
import { productCategoryService } from '@/services/ProductCategoryService';
import { productService } from '@/services/ProductService';
import { variationService } from '@/services/VariationService';

// Categorias
const fetchCategoryData = async () => {
    return productCategoryService.searchCategoryTree(null);
};

// category, color*, talle*, minPrice, maxPrice, page, pageSize, search

// Filtros
const fetchFilterData = async () => {
    return variationService.search(null);
}

// Productos
const fetchProductData = async () => {
    return productService.search(null, 1, 10);
};
 
export default async function SiteCategoryPage() {

  const categoryTree = await fetchCategoryData();
  const listProducts = await fetchProductData();
  const filters = await fetchFilterData();
  console.log('Filtros', filters);
  

  return (
    <ProductListMain categoryTree={categoryTree} listProducts={listProducts.rows} filters={filters}/>
  )
}