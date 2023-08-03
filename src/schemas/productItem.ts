import { array, number, object, string, InferType } from 'yup';

export const productItemSchema = object({
    image: string().required(),
    price: number().required().positive(),
    variation: array(
        object({
            name: string().required().max(100),
            value: string().required().max(100),
        })
    ).optional().min(1),
});

export const productItemInputSchema = object({
    image: string().optional(),
    price: number().required().positive(),   
    variation: array(number().integer().positive()).optional(),
});

export type ProductItem = InferType<typeof productItemSchema>;
export type ProductItemInput = InferType<typeof productItemInputSchema>;