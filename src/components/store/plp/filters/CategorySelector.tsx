import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'

export default function CategorySelector(props: { categoryTree: any, categoryTitle: string }) {

  const { categoryTree, categoryTitle } = props;

  // Subcategory List
  const [subCategories, setsubCategories] = useState([]);

  // Filter subcategories according to parent category.
  function findCategoryByName(categories: any, categoryName: string) {
    for (const category of categories) {
      category.name = category.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '');
      if (category.name === categoryName) {
        return category.children;
      }
    }
    return null;
  }

  const subcategories = findCategoryByName(categoryTree, categoryTitle);
  useEffect(() => {
    setsubCategories(subcategories);
  }, [categoryTree, subcategories])

  // Selectors Categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  console.log('selectedCategories', selectedCategories);

  return (
    subCategories.length > 0 ?
      <details
        className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
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
            <span className="text-sm text-gray-700"> {selectedCategories.length} Seleccionado/s </span>

            <button
              type="button"
              className="text-sm text-gray-900 underline underline-offset-4"
              onClick={() => {
                setSelectedCategories([])
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
                    <label htmlFor="FilterSubcategory" className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="FilterSubcategory"
                        className="h-5 w-5 rounded border-gray-300 category-checkbox accent-primary focus:ring-tertiary"
                        onChange={(e) => {
                          const categoryName = subcategory.name;
                          setSelectedCategories(
                            selectedCategories.includes(categoryName)
                              ? selectedCategories.filter((category) => category !== categoryName)
                              : [...selectedCategories, categoryName]
                          );
                        }}
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