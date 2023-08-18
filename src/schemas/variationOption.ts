import { ItemVariationDto } from "./variation";

export type VariationOptionDto = {
    id: number;
    value: string;
};

//used in productItem response
export type ItemVariationOptionDto = {
    id: number;
    value: string;
    variation: ItemVariationDto,
};