import ProductListMain from '@/components/store/plp/ProductListMain';
import { FilterProduct } from '@/schemas/filterProduct';
import { productCategoryService } from '@/services/ProductCategoryService';
import { productService } from '@/services/ProductService';
import { variationService } from '@/services/VariationService';

// Categorias
const fetchCategoryData = async () => {
    return productCategoryService.searchCategoryTree(null);
};

// Find Category by key
const findCategoryByKey: any = (key: string, categoryTree: any) => {
    let category = null;
    for (let i = 0; i < categoryTree.length; i++) {
        if (categoryTree[i].key == key) {
            category = categoryTree[i];
            break;
        } else if (categoryTree[i].childrens && categoryTree[i].childrens.length) {
            category = findCategoryByKey(key, categoryTree[i].childrens);
            if (category) {
                break;
            }
        }
    }
    return category;
};

// Find Category by id
const findCategoryById: any = (id: string, categoryTree: any) => {
    let category = null;
    for (let i = 0; i < categoryTree.length; i++) {
        if (categoryTree[i].id == id) {
            category = categoryTree[i];
            break;
        } else if (categoryTree[i].childrens && categoryTree[i].childrens.length) {
            category = findCategoryById(id, categoryTree[i].childrens);
            if (category) {
                break;
            }
        }
    }
    return category;
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

//recursive function to loop through the category tree and add a key to the category object
const addKeyToCategories = (categories: any, categoryTree: any) => {
    categories.forEach((category: any) => {
        let key = "";
        let currentCategory = category;
        while (currentCategory.parentId) {
            const parentCategory = findCategoryById(currentCategory.parentId, categoryTree);
            let name = parentCategory.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/[^\w]/g, '');
            key = name + "/" + key;
            currentCategory = parentCategory;
        }
        key = key + category.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/[^\w]/g, '')
        category.key = key;
        
        if (category.childrens && category.childrens.length) {
            addKeyToCategories(category.childrens, categoryTree);
        }
    });
};

export default async function SiteCategoryPage(props: {
    params: {
        category: string[] | undefined,
    },
    searchParams: { 
        priceMin: number | undefined,
        priceMax: number | undefined,
        [key: string]: number | string | undefined
    }
}) {
    
    const categoryTree = await fetchCategoryData();
    addKeyToCategories(categoryTree, categoryTree);
    const key = props.params.category?.join('/') || '';
    const categoryFinded = findCategoryByKey(key, categoryTree);

    const filters: FilterProduct = {
        category: categoryFinded ? categoryFinded.id : null,
        priceMin: props.searchParams.priceMin ? props.searchParams.priceMin : null,
        priceMax: props.searchParams.priceMax ? props.searchParams.priceMax : null,
        variations: [],
    }

    for (const key in props.searchParams) {
        if (props.searchParams.hasOwnProperty(key)) {
            if (key != 'category' && key != 'priceMin' && key != 'priceMax') {//TODO: delete magic strings
                const values = ((props.searchParams[key] as string)||"").split(',');
                filters.variations?.push({
                    key: key,
                    values: values,
                });
            }
        }
    }

    const listProducts = await fetchProductData(filters);
    const varations = await fetchVariationData();

    return (<>
        <ProductListMain categoryTree={categoryTree} listProducts={listProducts.rows} varations={varations} />
    </>
    )

    return (<>
        <p>
            <b>Categories:</b> {JSON.stringify(props.params.category)}
        </p>
        <p>
            <b>Key:</b> {key}
        </p>
        <p>
            <b>Search Params:</b> {JSON.stringify(props.searchParams)}
        </p>
        <p>
            <b>Category Tree:</b> {JSON.stringify(categoryTree, null,2)}
        </p>
        <p>
            <b>Category Finded:</b> {JSON.stringify(categoryFinded, null,2)}
        </p>
        <p>
            <b>Category ID:</b> {categoryFinded?.id}
        </p>
    </>
    )
    /*
    // Get URL Filters
    const principalCategory = props.params.name?props.params.name:'' as string;
    let key = principalCategory.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/[^\w]/g, '');

    props.searchParams.category?.forEach((category: string) => {
        key = key + "/" + category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/[^\w]/g, '');
    });

    addKeyToCategories(categoryTree, categoryTree);


    const filters: FilterProduct = {
        category: categoryFinded ? categoryFinded.id : null,
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

    const listProducts = await fetchProductData(filters);
    const varations = await fetchVariationData();

    return (<>
        <ProductListMain categoryTree={categoryTree} listProducts={listProducts.rows} varations={varations} />
    </>
    )
    */
}