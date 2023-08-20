import ProductListMain from '@/components/store/plp/ProductListMain';
import { FilterProduct, VariationFilter } from '@/schemas/filterProduct';
import { productCategoryService } from '@/services/ProductCategoryService';
import { productService } from '@/services/ProductService';
import { variationService } from '@/services/VariationService';

// Categorias
const fetchCategoryData = async () => {
  return productCategoryService.searchCategoryTree(null);
};

// Variaciones
const fetchVariationData = async () => {
  return variationService.search(null);
}

// List of filtered products
const fetchProductData = async (filters: FilterProduct) => {
  const products = await productService.searchByFilters(filters, 1, 10);
  return {
    totalItems: products.length,
    rows: products,
    totalPages: 1,
    currentPage: 1
  }
};

export default async function SiteCategoryPage(props: { params: any, searchParams: any }) {

  // Get URL Filters
  const filters: FilterProduct = {
    category: props.searchParams.category ? props.searchParams.category : null,
    priceMin: props.searchParams.priceMin ? parseInt(props.searchParams.priceMin) : null,
    priceMax: props.searchParams.priceMax ? parseInt(props.searchParams.priceMax) : null,
    variations: [],
  }
  for (const key in props.searchParams) {
    if (props.searchParams.hasOwnProperty(key)) {
      if (key != 'category' && key != 'priceMin' && key != 'priceMax') {
        filters.variations?.push({
          key: key,
          value: props.searchParams[key],
        });
      }
    }
  }
  console.log('FILTROS API', filters);


  const categoryTree = await fetchCategoryData();
  const listProducts = await fetchProductData(filters);
  const varations = await fetchVariationData();

  return (
    <ProductListMain categoryTree={categoryTree} listProducts={listProducts.rows} varations={varations} />
  )
}