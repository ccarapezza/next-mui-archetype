'use client'
import Variation from "@/db/models/Variation";
import VariationOption from "@/db/models/VariationOption";
import { useState } from "react";


export default function SkuComponent(props: { items: any }) {

    const { items } = props;

    // LOGICA FALOPA --------------------------------------------- //
    // Create an empty object to store the grouped variations
    const groupedVariations: { [key: string]: { variation: Variation; variationOptions: VariationOption[] } } = {};

    // Loop through the original array and group variations
    items.forEach((item: any) => {
        item.variationOptions.forEach((option: any) => {
            if (!groupedVariations[option.variation.name]) {
                groupedVariations[option.variation.name] = {
                    variation: option.variation,
                    variationOptions: []
                };
            }
            groupedVariations[option.variation.name].variationOptions.push(option);
        });
    });

    // Convert the groupedVariations object into an array
    const groupedArray = Object.values(groupedVariations);

    console.log(groupedArray);

    const estaCaquieta = groupedArray.map((group: any, i: number) => {
        return {
            name: group.variation.name,
            variation: group.variationOptions.map((option: any) => {
                return {
                    id: option.id,
                    value: option.value
                }
            }
            )
        }
    });

    console.log('estaCaquieta', estaCaquieta);


    // LOGICA FALOPA --------------------------------------------- //


    return (
        <>
            {
                estaCaquieta.map((group: any, i: number) => {
                    return (
                        <div key={i} className="py-2 border-y my-4">
                            <h1>{group.name}</h1>
                            {
                                group.variation.map((option: any, i: number) => {
                                    return (
                                        <div key={i}>
                                            <input type="radio" name={group.name} value={option.value} />
                                            <label htmlFor={option.value}>{option.value}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    )
                })
            }
        </>
    )
}