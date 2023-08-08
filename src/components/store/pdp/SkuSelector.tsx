'use client'

import { useState } from "react";

const items = [
  {
    price: 200,
    // SKU: '012345',
    variation: [
      {
        name: "Talle",
        value: "S"
      },
      {
        name: "Color",
        value: "#fff"
      }
    ]
  },
  {
    price: 200,
    // SKU: '012346',
    variation: [
      {
        name: "Talle",
        value: "M"
      },
      {
        name: "Color",
        value: "#000"
      }
    ]
  }
]

export default function SkuSelector() {
  const [color, setColor] = useState<string>('green');
  const [size, setSize] = useState<string>('S');

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  console.log('Color', color, 'Size', size);

  const renderColors = () => {
    return items.map((item, index) => {
      
      const colorValue = item.variation.find(variant => variant.name === 'Color')?.value;
      return (
        <label htmlFor={`color_${index}`} className="cursor-pointer" key={`color_${index}`}>
          <input
            type="radio"
            id={`color_${index}`}
            name="color"
            className="peer sr-only"
            value={colorValue}
            checked={color === colorValue}
            onChange={handleColorChange}
          />
          <span
            className={`block h-6 w-6 rounded-full border border-gray-200 bg-${colorValue}-700 ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300`}
          ></span>
        </label>
      );
    });
  };

  const renderSizes = () => {
    return items.map((item, index) => {
      const sizeValue = item.variation.find(variant => variant.name === 'Talle')?.value;
      return (
        <label htmlFor={`size_${sizeValue}`} className="cursor-pointer" key={`size_${sizeValue}`}>
          <input
            type="radio"
            id={`size_${sizeValue}`}
            name="size"
            className="peer sr-only"
            value={sizeValue}
            checked={size === sizeValue}
            onChange={handleSizeChange}
          />
          <span
            className="block rounded-full border border-gray-200 px-3 py-1 text-xs peer-checked:bg-gray-100"
          >
            {sizeValue}
          </span>
        </label>
      );
    });
  };

  return (
    <div className="my-8">
      <fieldset className="my-6">
        <legend className="text-lg font-bold">Color</legend>

        <div className="mt-2 flex flex-wrap gap-1">
          {renderColors()}
        </div>
      </fieldset>

      <fieldset className="my-2">
        <legend className="text-lg font-bold">Talle</legend>

        <div className="mt-2 flex flex-wrap gap-1">
          {renderSizes()}
        </div>
      </fieldset>
    </div>
  )
}
