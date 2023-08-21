'use client'

import { useEffect, useState } from "react";
import ColorSku from "./ColorSku";
import SizeSku from "./SizeSku";
import SkuComponent from "./SkuComponent";
import { ProductItemDto } from "@/schemas/productItem";

interface VariationObject {
  [key: string]: string;
}

export default function SkuSelector(props: { items: ProductItemDto[], setProductAvailable: (productAvailable: boolean) => void, setItemId: any}) {

  // Props
  const { items, setProductAvailable, setItemId } = props;

  // Get the available variations of the product.
  const variationMap: any = {};
  items.forEach((product: any) => {
    product.variationOptions.forEach((option: any, i: number) => {
      const variationName = option.variation.name;
      const optionValue = option.value;

      if (!variationMap[variationName]) {
        variationMap[variationName] = {
          variationName: variationName,
          values: []
        };
      }

      if (!variationMap[variationName].values.includes(optionValue)) {
        variationMap[variationName].values.push(optionValue);
      }
    });
  });

  const resultArray = Object.values(variationMap);

  // Status selected variations
  const initialVariationStates: { [key: string]: string } = {};
  resultArray.forEach((option: any) => {
    initialVariationStates[option.variationName] = option.values[0];
  });

  const [variationState, setVariationState] = useState<VariationObject>({
    ...initialVariationStates
  });

  // Check if the selected state matches any available variable and return the id of the same
  useEffect(() => {
    const selectedSku = items.find((item: any) => {
      return item.variationOptions.every((option: any) => {
        return variationState[option.variation.name] === option.value;
      });
    });
  
    selectedSku && selectedSku.stock > 0 ? setProductAvailable(true) : setProductAvailable(false);
    selectedSku ? props.setItemId(selectedSku.id) : props.setItemId(0);
  }, [variationState, items, setProductAvailable]);

  return (
    <div className="my-4 py-2 border-y">
      <SkuComponent items={items} setSelectedOption={setVariationState} variationState={variationState} resultArray={resultArray} />
    </div>
  )
}
