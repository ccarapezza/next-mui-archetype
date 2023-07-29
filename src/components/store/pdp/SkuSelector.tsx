'use client'

export default function () {

  return (
    <div className="my-8">
      <fieldset className="my-6">
        <legend className="text-lg font-bold">Color</legend>

        <div className="mt-2 flex flex-wrap gap-1">
          <label htmlFor="color_green" className="cursor-pointer">
            <input
              type="radio"
              id="color_green"
              name="color"
              className="peer sr-only"
              defaultChecked
            />

            <span
              className="block h-6 w-6 rounded-full border border-gray-200 bg-green-700 ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"
            ></span>
          </label>

          <label htmlFor="color_blue" className="cursor-pointer">
            <input
              type="radio"
              id="color_blue"
              name="color"
              className="peer sr-only"
            />

            <span
              className="block h-6 w-6 rounded-full border border-gray-200 bg-blue-700 ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"
            ></span>
          </label>
        </div>
      </fieldset>

      <fieldset className="my-2">
        <legend className="text-lg font-bold">Talle</legend>

        <div className="mt-2 flex flex-wrap gap-1">
          <label htmlFor="material_cotton" className="cursor-pointer">
            <input
              type="radio"
              id="material_cotton"
              name="material"
              className="peer sr-only"
              defaultChecked
            />

            <span
              className="block rounded-full border border-gray-200 px-3 py-1 text-xs peer-checked:bg-gray-100"
            >
              S
            </span>
          </label>

          <label htmlFor="material_wool" className="cursor-pointer">
            <input
              type="radio"
              id="material_wool"
              name="material"
              className="peer sr-only"
              defaultChecked
            />

            <span
              className="block rounded-full border border-gray-200 px-3 py-1 text-xs peer-checked:bg-gray-100"
            >
              M
            </span>
          </label>
        </div>
      </fieldset>
    </div>
  )
}