'use client'
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


export default function SizeSelector(props: { talles: any }) {

  const { talles } = props;

  // Selectors Talle
  const [selectedTalle, setSelectedTalle] = useState<string[]>([]);
  console.log('selectedColor', selectedTalle);

  return (
    talles.length > 0 ?
      <details
        className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
      >
        <summary
          className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
        >
          <span className="text-sm font-medium"> Talle </span>

          <span className="transition group-open:-rotate-180">
            <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4" />
          </span>
        </summary>

        <div className="border-t border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
            <span className="text-sm text-gray-700"> {selectedTalle.length} Seleccionado/s </span>

            <button
              type="button"
              className="text-sm text-gray-900 underline underline-offset-4"
              onClick={() => {
                setSelectedTalle([])
              }}
            >
              Reset
            </button>
          </header>

          <ul className="space-y-1 border-t border-gray-200 p-4">
            {
              talles?.map((talle: any, i: number) => {
                return (
                  <li key={i}>
                    <label className="inline-flex items-center gap-4 cursor-pointer"
                      onClick={
                        () => {
                          const talleName = talle.talle;
                          setSelectedTalle(
                            selectedTalle.includes(talleName)
                              ? selectedTalle.filter((talle) => talle !== talleName)
                              : [...selectedTalle, talleName]
                          );
                        }
                      }
                    >
                      <div className={`flex items-center justify-center w-[40px] rounded-md border ${selectedTalle.includes(talle.talle) ? 'text-tertiary font-semibold border-black' : 'text-gray border-gray'}`}>
                        {talle.talle}
                      </div>
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