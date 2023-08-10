'use client'

import { useState } from "react";
import ColorSku from "./ColorSku";
import SizeSku from "./SizeSku";

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
        value: "#000000"
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
        value: "#FF0000"
      }
    ]
  }
]

export default function SkuSelector() {

  return (
    <div className="py-2 border-y my-4">
      <ColorSku items={items} />
      <SizeSku items={items} />
    </div>

  )
}
