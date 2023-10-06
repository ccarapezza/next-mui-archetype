import { ProductCategoryDto } from '@/schemas/category';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'

export default function CategorySelector(props: { categoryTree: ProductCategoryDto[], categoryTitle: string | null, filters: any, setFilters: any }) {

    const { categoryTree, categoryTitle, filters, setFilters } = props;

    // Subcategory List
    const [subCategories, setsubCategories] = useState<ProductCategoryDto[]>([]);
    const [variatonCollapse, setVariatonCollapse] = useState(filters.selectedCategories.length?true:false);


    
    useEffect(() => {
        const findNameOnTree = (name: string, categories: ProductCategoryDto[] = categoryTree): ProductCategoryDto | null => {
            let result: ProductCategoryDto | null = null;
            categories?.forEach((category) => {
                if (category.name.toLocaleLowerCase() === name.toLocaleLowerCase()) {
                    result = category;
                } else if (category.childrens && category.childrens.length > 0) {
                    const findedOnChilds = findNameOnTree(name, category.childrens);
                    if (findedOnChilds) {
                        result = findedOnChilds;
                    }
                }
            });
            return result;
        }
        if(categoryTitle !== 'tienda'){
            const category = findNameOnTree(categoryTitle!);
            setsubCategories(category?.childrens!);
        }else{
            setsubCategories(categoryTree);
        }
    }, [categoryTree, categoryTitle])

    return (
        subCategories?.length > 0 ?
            <details
                className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                open={variatonCollapse}
            >
                <summary
                    className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                >
                    <span className="text-sm font-medium"> Categorias </span>


                    <span className="transition group-open:-rotate-180">
                        <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4" />
                    </span>
                </summary>

                <div className="border-t border-gray-200 bg-white">
                    <header className="flex items-center justify-between p-4">
                        <span className="text-sm text-gray-700"> {filters.selectedCategories.length} Seleccionado/s </span>

                        <button
                            type="button"
                            className="text-sm text-gray-900 underline underline-offset-4"
                            onClick={() => {
                                setFilters({ ...filters, selectedCategories: [] });
                                const checkboxes = document.querySelectorAll<HTMLInputElement>('.category-checkbox');
                                checkboxes.forEach((checkbox) => {
                                    checkbox.checked = false;
                                });
                            }}
                        >
                            Reset
                        </button>
                    </header>

                    <ul className="space-y-1 border-t border-gray-200 p-4">
                        {
                            subCategories?.map((subcategory: any, i: number) => {
                                return (
                                    <li key={i}>
                                        <label className="inline-flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="FilterSubcategory"
                                                className={`h-5 w-5 rounded border-gray-300 category-checkbox accent-primary focus:ring-tertiary`}
                                                onChange={(e) => {
                                                    const categoryName = subcategory.name;
                                                    setFilters(
                                                        {
                                                            ...filters, selectedCategories:
                                                                filters.selectedCategories.includes(categoryName)
                                                                    ? filters.selectedCategories.filter((category: any) => category !== categoryName)
                                                                    : [...filters.selectedCategories, categoryName]
                                                        }
                                                    );
                                                }}
                                                checked={filters.selectedCategories.includes(subcategory.name)}
                                            />

                                            <span className="text-sm font-medium text-gray-700">
                                                {subcategory.name}
                                            </span>
                                        </label>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </details>
            :
            <></>
    )
}