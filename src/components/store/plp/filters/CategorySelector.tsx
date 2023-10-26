import { ProductCategoryDto } from '@/schemas/category';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function CategorySelector(props: { options?: ProductCategoryDto[] | null, level: number, categoryTree: ProductCategoryDto[], categoryTitle: string | null, filters: any, setFilters: any } = { options: null, level: 0, categoryTree: [], categoryTitle: null, filters: {}, setFilters: {} }) {

    const { categoryTree, categoryTitle, filters, setFilters, level } = props;

    // Subcategory List
    const [subCategories, setsubCategories] = useState<ProductCategoryDto[]>([]);
    const [variatonCollapse, setVariatonCollapse] = useState(true);
    const [categoryLabel, setCategoryLabel] = useState<String>("");
    const { category } = useParams<{ category: string[] }>();
    const [selectedLevelKey] = useState<string>(category && level < category.length ? category.slice(0, level + 1).join("/") : "");
    const [childrens, setChildrens] = useState<ProductCategoryDto[] | null>(null);

    useEffect(() => {
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
        const findIdOnTree = (id: number, categories: ProductCategoryDto[] = categoryTree): ProductCategoryDto | null => {
            let result: ProductCategoryDto | null = null;
            categories?.forEach((category) => {
                if (category.id === id) {
                    result = category;
                } else if (category.childrens && category.childrens.length > 0) {
                    const findedOnChilds = findIdOnTree(id, category.childrens);
                    if (findedOnChilds) {
                        result = findedOnChilds;
                    }
                }
            });
            return result;
        }

        const categorySelected = selectedLevelKey ? findKeyOnTree(selectedLevelKey) : null;
        const parentCategory = props.options?.[0]?.parentId ? findIdOnTree(props.options?.[0]?.parentId, categoryTree) : null;
        setChildrens(categorySelected?.childrens || null);
        setsubCategories(props.options || categoryTree);
        if (level !== 0) {
            setCategoryLabel(parentCategory?.name || "");
        }
    }, [categoryTree, categoryTitle])

    return (<>
        {subCategories?.length > 0 ?
            <>
                <details
                    className="group overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                    open={variatonCollapse}
                >
                    <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
                        <span className="text-sm font-medium">
                            {categoryLabel?categoryLabel:`Categorias`}
                        </span>
                        <span className="transition group-open:-rotate-180">
                            <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4" />
                        </span>
                    </summary>
                    <div className="border-t border-gray-200 bg-white">
                        <ul className="space-y-1 p-4">
                            {subCategories?.map((subcategory: any, i: number) => {
                                return (
                                    <li key={i}>
                                        <label className="inline-flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="FilterSubcategory"
                                                className={`h-5 w-5 rounded border-gray-300 category-checkbox accent-primary focus:ring-tertiary`}
                                                onChange={(e) => {
                                                    const selectedCategories = subcategory.key.split("/");
                                                    if (!e.target.checked) {
                                                        selectedCategories.splice(level, 1);
                                                    }
                                                    setFilters({
                                                        ...filters,
                                                        selectedCategories: selectedCategories
                                                    });
                                                }}
                                                checked={selectedLevelKey === subcategory.key}
                                            />
                                            <span className="text-sm font-medium text-gray-700">
                                                {subcategory.name}
                                            </span>
                                        </label>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </details>
                {childrens && childrens.length > 0 &&
                    <CategorySelector level={(level) + 1} options={childrens} categoryTree={categoryTree} categoryTitle={filters.selectedCategories[level]} filters={filters} setFilters={setFilters} />
                }
            </>
            :
            <></>
        }
    </>
    )
}