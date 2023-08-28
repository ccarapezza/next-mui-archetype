import { array, number, object, string, InferType } from 'yup';
import { VariationOptionDto } from './variationOption';

export const productItemSchema = object({
    images: array(string().required()).optional().min(1),
    price: number().required().positive(),
    variation: array(
        object({
            name: string().required().max(100),
            value: string().required().max(100),
        })
    ).optional().min(1),
});

export const productItemInputSchema = object({
    images: array(string().required()).optional(),
    price: number().required().positive(),   
    variation: array(number().integer().positive()).optional(),
});

export type ProductItem = InferType<typeof productItemSchema>;
export type ProductItemInput = InferType<typeof productItemInputSchema>;

export type ProductItemDto = {
    id: number;
    variationOptions?: VariationOptionDto[] | undefined;
    images: string[];
    price: number;
    sku: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}