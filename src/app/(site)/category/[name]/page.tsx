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

export default async function SiteCategoryPage(props: { params: any, searchParams: { 
    category: string | undefined,
    priceMin: number | undefined,
    priceMax: number | undefined,
    [key: string]: number | string | undefined
} }) {
    // Get URL Filters
    const principalCategory = props.params.name?props.params.name:'' as string;
    const filters: FilterProduct = {
        category: props.searchParams.category ? props.searchParams.category : principalCategory,
        priceMin: props.searchParams.priceMin ? props.searchParams.priceMin : null,
        priceMax: props.searchParams.priceMax ? props.searchParams.priceMax : null,
        variations: [],
    }
    
    for (const key in props.searchParams) {
        if (props.searchParams.hasOwnProperty(key)) {
            if (key != 'category' && key != 'priceMin' && key != 'priceMax') {
                const values = ((props.searchParams[key] as string)||"").split(',');
                filters.variations?.push({
                    key: key,
                    values: values,
                });
            }
        }
    }

    const categoryTree = await fetchCategoryData();
    const listProducts = await fetchProductData(filters);
    const varations = await fetchVariationData();

    return (<>
        <ProductListMain categoryTree={categoryTree} listProducts={listProducts.rows} varations={varations} />
    </>
    )
}