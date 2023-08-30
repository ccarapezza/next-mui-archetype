'use client'

import { useEffect, useState } from "react";
import SkuComponent from "./SkuComponent";
import { ProductItemDto } from "@/schemas/productItem";

interface VariationObject {
    [key: string]: string;
}

export default function SkuSelector(props: { items: ProductItemDto[], setProductAvailable: (productAvailable: boolean) => void, setItemId: any }) {
    // Props
    const { items, setProductAvailable, setItemId } = props;

    // Function to find the index of the first object with stock greater than 0
    function findFirstPositiveStockIndex(data: any) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].stock > 0) {
                return i;
            }
        }
        return 0;
    }
    const firstItemWithStock = findFirstPositiveStockIndex(items);

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
        initialVariationStates[option.variationName] = option.values[firstItemWithStock];
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
        selectedSku ? setItemId(selectedSku.id) : setItemId(0);
    }, [variationState, items, setProductAvailable, setItemId]);

    return (
        <div className="my-4 py-2 border-y">
            <SkuComponent items={items} setSelectedOption={setVariationState} variationState={variationState} resultArray={resultArray} />
        </div>
    )
}
