'use client'
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function GenericSelector(props: { filters: any, setFilters: any, variation: any }) {

    const { filters, setFilters, variation } = props;
    const { name, variationOptions } = variation;
    const [variatonCollapse, setVariatonCollapse] = useState(filters[name].length?true:false);

    return (
        variationOptions.length > 0 ?
            <details
                className="group overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                open={variatonCollapse}
            >
                <summary
                    className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                >
                    <span className="text-sm font-medium"> {name} </span>

                    <span className="transition group-open:rotate-180">
                        <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4" />
                    </span>
                </summary>

                <div className="border-t border-gray-200 bg-white">
                    <header className="flex items-center justify-between p-4">
                        <span className="text-sm text-gray-700"> {filters[name].length} Seleccionado/s </span>

                        <button
                            type="button"
                            className="text-sm text-gray-900 underline underline-offset-4"
                            onClick={() => {
                                setFilters({ ...filters, [name]: [] });
                            }}
                        >
                            Reset
                        </button>
                    </header>

                    <ul className="space-y-1 border-t border-gray-200 p-4">
                        {
                            variationOptions?.map((variation: any, i: number) => {
                                return (
                                    <li key={i}>
                                        <label className="inline-flex items-center gap-4 cursor-pointer"
                                            onClick={
                                                () => {
                                                    const variationName = variation.value;
                                                    setFilters({
                                                        ...filters, [name]:
                                                            filters[name].includes(variationName)
                                                                ? filters[name].filter((variation: string) => variation !== variationName)
                                                                : [...filters[name], variationName]
                                                    }
                                                    );
                                                }
                                            }
                                        >
                                            {
                                                name != 'Color' ?
                                                    <>
                                                        <div className={`flex items-center justify-center min-w-[40px] py-1 px-2 rounded-md border ${filters[name].includes(variation.value) ? 'text-tertiary font-semibold border-black' : 'text-gray border-gray'}`}>
                                                            {variation.value}
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className={`flex items-center justify-center w-6 h-6 rounded-full border ${filters[name].includes(variation.value) ? 'border-2 border-black' : ''}`}>
                                                            <div className='w-4 h-4 rounded-full border'
                                                                style={{ backgroundColor: variation.value }}
                                                            >
                                                            </div>
                                                        </div>
                                                    </>
                                            }
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