'use client'

import { useState } from "react";
import { string } from "yup";


export default function ColorSku(props: { items: any }) {

  const { items } = props;

  const colorVariations = items.map((item: any) => {
    const colorVariation = item.variation.find((variation: any) => variation.name === "Color");
    return colorVariation ? colorVariation.value : null;
  });

  const [selectedColor, setSelectedColor] = useState(colorVariations[0]);
  // console.log('selectedColor', selectedColor);

  // console.log('Color Producto', colorVariations);


  return (
    <>
      <h3>Color:</h3>
      <ul className="flex items-center py-2">
        {
          colorVariations?.map((color: any, i: number) => {
            return (
              <li key={i}>
                <label className="inline-flex items-center cursor-pointer"
                  onClick={
                    () => {
                      setSelectedColor(color);
                    }
                  }
                >
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full ${selectedColor.includes(color) ? 'border border-black' : ''}`}>
                    <div className='w-4 h-4 rounded-full'
                      style={{ backgroundColor: color }}
                    >
                    </div>
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