'use client'
import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation';
import CategorySelector from './filters/CategorySelector';
import PricePicker from './filters/PricePicker';
import MainGenericSelector from './filters/generic-filters/MainGenericSelector';
import { VariationFilter } from '@/schemas/filterProduct';
import { ProductCategoryDto } from '@/schemas/category';

interface FilterState {
    selectedCategories: string[];
    selectedPrice: { from: string; to: string };
}

export default function ProductFilters(props: { categoryTree: any, categoryTitle: string | null, varationsDTO: any }) {
    // Porps
    const { categoryTree, categoryTitle, varationsDTO } = props;
    
    // Routes
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { category } = useParams<{category: string[]}>();
    const priceMinParams = searchParams.get('priceMin');
    const priceMaxParams = searchParams.get('priceMax');

    // Filter State
    const variationList = varationsDTO.map((variation: any) => {
        return {
            key: variation.name,
            value: ''
        }
    });

    const initialVariationStates: { [key: string]: string[] } = {};
    variationList.forEach((variation: VariationFilter) => {
        const genericFiltersParams = searchParams.get(variation.key)?.split(',');
        initialVariationStates[variation.key] = [] || searchParams.get(variation.key)?.split(',');
        initialVariationStates[variation.key] = genericFiltersParams ? genericFiltersParams : [];
    });

    const [filters, setFilters] = useState<FilterState>({
        selectedCategories: category?category:[],
        ...initialVariationStates,
        selectedPrice: {
            from: priceMinParams ? priceMinParams : '',
            to: priceMaxParams ? priceMaxParams : ''
        }
    });

    
    useEffect(() => {
        // Function to set URL
        const setStateToUrl = ({
            selectedCategories,
            selectedPrice,
            ...variationStates
        }: any) => {
            const paramsToAdd: any = [];
    
            const addParam = (name: string, value: string[]) => {
                if (value.length > 0) {
                    paramsToAdd.push({
                        name,
                        value: value.join(',')
                    });
                }
            };

            if (selectedPrice.from !== '' || selectedPrice.to !== '') {
                if (selectedPrice.from !== '') {
                    addParam('priceMin', [selectedPrice.from]);
                }
                if (selectedPrice.to !== '') {
                    addParam('priceMax', [selectedPrice.to]);
                }
            }
    
            Object.entries(variationStates).forEach((variationStates: any) => {
                const variationName = variationStates[0];
                const variationValues = variationStates[1];
                if (variationValues.length > 0) {
                    addParam(variationName , variationValues);
                }
            });
    
            const queryParams = new URLSearchParams(
                paramsToAdd.map((param: any) => [param.name, param.value])
            );
    
            router.push(`/shop/${selectedCategories.join('/')}?${queryParams.toString()}`);
        };
        setStateToUrl(filters)
    }, [filters, pathname, router]);

    const findKeyOnTree = (key: string, categories: ProductCategoryDto[] = categoryTree): ProductCategoryDto | null => {
        let result: ProductCategoryDto | null = null;
        categories?.forEach((category) => {
            if (category.key === key) {
                result = category;
            } else if (category.childrens && category.childrens.length > 0) {
                const findedOnChilds = findKeyOnTree(key, category.childrens);
                if (findedOnChilds) {
                    result = findedOnChilds;
                }
            }
        });
        return result;
    }

    const categoriesSelected = filters.selectedCategories;
    const keys : string[] = [];
    categoriesSelected.forEach((category: string, i: number) => {
        const current = categoriesSelected.slice(0, i + 1).join("/");
        keys.push(current);
    });   

    const categoriesId: (number | undefined)[] = [];
    keys.forEach((key: string) => {
        const categorySelected = findKeyOnTree(key);
        categoriesId.push(categorySelected?.id);
    });
    const filterVariations = varationsDTO.filter((variation: any) => {
        return categoriesId.includes(variation.categoryId);
    });

    return (
        <div className="space-y-2">
            <h3 className='text-lg text-tertiary-800 font-semibold pb-2 border-b border-gray-300 mb-4'>Filtros:</h3>
            <CategorySelector level={0} categoryTree={categoryTree} categoryTitle={categoryTitle} filters={filters} setFilters={setFilters} />
            <MainGenericSelector filters={filters} setFilters={setFilters} varationsDTO={filterVariations} />
            <PricePicker filters={filters} setFilters={setFilters} />
        </div>
    )
}