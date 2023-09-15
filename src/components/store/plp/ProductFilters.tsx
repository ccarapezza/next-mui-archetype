'use client'
import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import CategorySelector from './filters/CategorySelector';
import PricePicker from './filters/PricePicker';
import MainGenericSelector from './filters/generic-filters/MainGenericSelector';
import { VariationFilter } from '@/schemas/filterProduct';

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
    const categoryParam = searchParams.get('category');
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
        selectedCategories: categoryParam ? categoryParam.split(',') : [],
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
    
    
            addParam('category', selectedCategories);
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
    
            router.push(`${pathname}?${queryParams.toString()}`);
        };
        setStateToUrl(filters)
    }, [filters,pathname, router])

    return (
        <div className="space-y-2">
            <h3 className='text-lg text-tertiary-800 font-semibold pb-2 border-b border-gray-300 mb-4'>Filtros:</h3>
            <CategorySelector categoryTree={categoryTree} categoryTitle={categoryTitle} filters={filters} setFilters={setFilters} />
            <MainGenericSelector filters={filters} setFilters={setFilters} varationsDTO={varationsDTO} />
            <PricePicker filters={filters} setFilters={setFilters} />
        </div>
    )
}