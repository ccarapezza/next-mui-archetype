'use client'

import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { string } from "yup";

export default function QuantitySelector(props: { quantity: number, setQuantity: (quantity: number) => void }) {
    const { quantity, setQuantity } = props;

    return (
        <div className="flex justify-around md:justify-normal items-center mb-4 md:mb-0 border border-gray-200 rounded w-full md:w-[100px]">
            <button
                type="button"
                className="flex items-center justify-center w-8 h-8 leading-10 text-gray-600 transition hover:opacity-75"
                onClick={() => {
                    setQuantity(quantity > 1 ? quantity - 1 : 1)
                }}
            >
                <FontAwesomeIcon icon={faMinus} />
            </button>

            <input
                type="number"
                id="quantity"
                value={String(quantity)}
                onChange={(e) => { setQuantity(parseInt(e.target.value)) }}
                className="h-8 w-10 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
            />

            <button
                type="button"
                className="flex items-center justify-center w-8 h-8 leading-10 text-gray-600 transition hover:opacity-75"
                onClick={() => {
                    setQuantity(quantity + 1)
                }}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    )
}
