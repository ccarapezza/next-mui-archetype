'use client'

import { useState } from "react";
import ColorSku from "./ColorSku";
import SizeSku from "./SizeSku";
import SkuComponent from "./SkuComponent";

interface Variation {
  id: number;
  name: string;
}

interface VariationOption {
  id: number;
  value: string;
  variation: Variation;
  product_configuration: {
      createdAt: string;
      updatedAt: string;
      productItemId: number;
      variationOptionId: number;
  };
}

interface Item {
  id: number;
  sku: string;
  stock: number;
  price: number;
  variationOptions: VariationOption[];
  images: string[];
}

// const items = [
//   {
//     price: 200,
//     // SKU: '012345',
//     variation: [
//       {
//         name: "Talle",
//         value: "S"
//       },
//       {
//         name: "Color",
//         value: "#000000"
//       }
//     ]
//   },
//   {
//     price: 200,
//     // SKU: '012346',
//     variation: [
//       {
//         name: "Talle",
//         value: "M"
//       },
//       {
//         name: "Color",
//         value: "#FF0000"
//       }
//     ]
//   }
// ]

export default function SkuSelector(props: { items: any }) {

const { items } = props;

  return (
      <SkuComponent items={items} />
  )
}
