import { ProductCategoryDto } from "./category";
import { VariationOptionDto } from "./variationOption";

export type VariationDto = {
    id: number;
    name: string;
    category: ProductCategoryDto;
    variationOptions: VariationOptionDto[];
};