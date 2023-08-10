'use client'

import { useState } from "react";


export default function SizeSku(props: { items: any }) {

  const { items } = props;

  const talleVariations = items.map((item: any) => {
    const talleVariations = item.variation.find((variation: any) => variation.name === "Talle");
    return talleVariations ? talleVariations.value : null;
  });

  const [selectedTalle, setSelectedTalle] = useState(talleVariations[0]);
  console.log('selectedColor', selectedTalle);

  return (
    <>
      <h3>Talle:</h3>
      <ul className="flex items-center py-2">
        {
          talleVariations?.map((talle: string, i: number) => {
            return (
              <li key={i} className="mr-2">
                <label className="inline-flex items-center gap-4 cursor-pointer"
                  onClick={
                    () => {
                      setSelectedTalle(talle)
                    }
                  }
                >
                  <div className={`flex items-center justify-center w-[50px] rounded-md border ${selectedTalle.includes(talle) ? 'text-tertiary font-semibold border-black' : 'text-gray border-gray'}`}>
                    {talle}
                  </div>
                </label>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}