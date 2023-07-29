'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SkuSelector from "./SkuSelector"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function () {

  return (
    <div className="relative mt-4 w-full md:w-1/2 md:ml-4">
      <div>
        <div>
          <h1 className="text-2xl font-bold lg:text-3xl">Simple Clothes Basic Tee</h1>

          <p className="mt-1 text-sm text-gray-500">SKU: #012345</p>
        </div>
        <div className="mt-2">
          <p className="text-xl font-bold">$15.000,99</p>
        </div>
        <div className="mt-4">
          <div className="max-w-none">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam totam
              eos iusto repellat blanditiis voluptate aspernatur, quae nemo
              exercitationem cum debitis!
            </p>
          </div>
        </div>
        <SkuSelector />
      </div>

      <div>
        <div className="block gap-2 md:flex">
          <div className="flex justify-around md:justify-normal items-center mb-4 md:mb-0 border border-gray-200 rounded w-full md:w-[100px]">
            <button
              type="button"
              className="w-8 h-8 leading-10 text-gray-600 transition hover:opacity-75"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>

            <input
              type="number"
              id="quantity"
              value="1"
              className="h-8 w-10 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
            />

            <button
              type="button"
              className="w-8 h-8 leading-10 text-gray-600 transition hover:opacity-75"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <button
            className="w-full rounded bg-red-700 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
            onClick={() => {
              console.log('Agregado al carrito');
            }}
          >
            Agregar al Carrito!
          </button>

        </div>
      </div>
    </div>
  )
}