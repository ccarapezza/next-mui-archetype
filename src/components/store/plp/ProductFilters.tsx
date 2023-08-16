'use client'
import CategorySelector from './filters/CategorySelector';
import ColorPicker from './filters/ColorPicker';
import SizeSelector from './filters/SizeSelector';
import PricePicker from './filters/PricePicker';
import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import createQueryString from '@/utils/RouterUtil';

interface FilterState {
    selectedCategories: string[];
    selectedTalle: string[];
    selectedColor: string[];
    selectedPrice: { from: number; to: number };
}

export default function ProductFilters(props: { categoryTree: any, categoryTitle: string }) {
    const colors = [
        {
            color: '#000000',
            name: 'Negro',
        },
        {
            color: '#002BFF',
            name: "Azul",
        },
        {
            color: '#FF0000',
            name: "Rojo",
        },
        {
            color: '#00FF04',
            name: "Verde",
        }
    ]

    const talles = [
        {
            talle: 'S',
        },
        {
            talle: "M",
        },
        {
            talle: "L",
        },
        {
            talle: "XL",
        }
    ]

    //----------------------------------------------------------------------//

    const { categoryTree, categoryTitle } = props;

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');
    const talleParams = searchParams.get('talle');
    const colorParams = searchParams.get('color');
    const priceMinParams = searchParams.get('pricemin');
    const priceMaxParams = searchParams.get('pricemax');
    

    const [filters, setFilters] = useState<FilterState>({
        selectedCategories: categoryParam ? categoryParam.split(',') : [],
        selectedTalle: talleParams ? talleParams.split(',') : [],
        selectedColor: colorParams ? colorParams.split(',') : [],
        selectedPrice: {
            from: priceMinParams ? parseInt(priceMinParams) : 0,
            to: priceMaxParams ? parseInt(priceMaxParams) : 15000
        }
    });

    useEffect(() => {
        setStateToUrl(filters)
    }, [filters])


    const setStateToUrl = (filtersState: FilterState) => {
        const { selectedCategories, selectedTalle, selectedColor, selectedPrice } = filtersState;
        router.push(pathname + '?' + createQueryString(
            [{
                name: 'category',
                value: selectedCategories.join(',')
            }
                , {
                name: 'talle',
                value: selectedTalle.join(',')
            }
                , {
                name: 'color',
                value: selectedColor.join(',')
            }
                , {
                name: 'pricemin',
                value: selectedPrice.from.toString()
            },
            {
                name: 'pricemax',
                value: selectedPrice.to.toString()
            },
            {
                name: 'page',
                value: '1'
            },
            {
                name: 'limit',
                value: '12'
            }
        ],
            searchParams.toString())
        )
    }

    return (
        <div className="space-y-2">
            <h3 className='text-lg text-tertiary-800 font-semibold pb-2 border-b border-gray-300 mb-4'>Filtros:</h3>
            <CategorySelector categoryTree={categoryTree} categoryTitle={categoryTitle} filters={filters} setFilters={setFilters} />
            <ColorPicker colors={colors} filters={filters} setFilters={setFilters} />
            <SizeSelector talles={talles} filters={filters} setFilters={setFilters} />
            <PricePicker filters={filters} setFilters={setFilters} />
        </div>
    )
}