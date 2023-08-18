'use client'
import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import CategorySelector from './filters/CategorySelector';
import ColorPicker from './filters/ColorPicker';
import SizeSelector from './filters/SizeSelector';
import PricePicker from './filters/PricePicker';

interface FilterState {
    selectedCategories: string[];
    selectedTalle: string[];
    selectedColor: string[];
    selectedPrice: { from: string; to: string };
}

export default function ProductFilters(props: { categoryTree: any, categoryTitle: string, filtersDTO: any }) {

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

    const { categoryTree, categoryTitle, filtersDTO } = props;

    console.log('Filtros desde pdpFilters', filtersDTO);

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
            from: priceMinParams ? priceMinParams : '',
            to: priceMaxParams ? priceMaxParams : ''
        }
    });

    useEffect(() => {
        setStateToUrl(filters)
    }, [filters])

    const setStateToUrl = ({
        selectedCategories,
        selectedTalle,
        selectedColor,
        selectedPrice
    }: FilterState) => {
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
        addParam('talle', selectedTalle);
        addParam('color', selectedColor);

        if (selectedPrice.from !== '' || selectedPrice.to !== '') {
            if (selectedPrice.from !== '') {
                addParam('pricemin', [selectedPrice.from]);
            }
            if (selectedPrice.to !== '') {
                addParam('pricemax', [selectedPrice.to]);
            }
        }

        const queryParams = new URLSearchParams(
            paramsToAdd.map((param: any) => [param.name, param.value])
        );

        router.push(`${pathname}?${queryParams.toString()}`);
    };

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