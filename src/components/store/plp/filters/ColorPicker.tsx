'use client'
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


export default function ColorPicker(props: { colors: any }) {

  const { colors } = props;

  // Selectors Colors
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  console.log('selectedColor', selectedColor);

  return (
    colors.length > 0 ?
      <details
        className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
      >
        <summary
          className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
        >
          <span className="text-sm font-medium"> Color </span>

          <span className="transition group-open:-rotate-180">
            <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4" />
          </span>
        </summary>

        <div className="border-t border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
            <span className="text-sm text-gray-700"> {selectedColor.length} Seleccionado/s </span>

            <button
              type="button"
              className="text-sm text-gray-900 underline underline-offset-4"
              onClick={() => {
                setSelectedColor([])
              }}
            >
              Reset
            </button>
          </header>

          <ul className="space-y-1 border-t border-gray-200 p-4">
            {
              colors?.map((color: any, i: number) => {
                return (
                  <li key={i}>
                    <label className="inline-flex items-center gap-2 cursor-pointer"
                      onClick={
                        () => {
                          const colorName = color.name;
                          setSelectedColor(
                            selectedColor.includes(colorName)
                              ? selectedColor.filter((color) => color !== colorName)
                              : [...selectedColor, colorName]
                          );
                        }
                      }
                    >
                      <div className={`flex items-center justify-center w-6 h-6 rounded-full ${selectedColor.includes(color.name) ? 'border border-black' : ''}`}>
                        <div className='w-4 h-4 rounded-full'
                          style={{ backgroundColor: color.color }}
                        >
                        </div>
                      </div>

                      <span className="text-sm font-medium text-gray-700">
                        {color.name}
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