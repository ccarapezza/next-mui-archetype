import { array, object, string, InferType, number } from 'yup';
import { ProductItemDto, productItemInputSchema, productItemSchema } from './productItem';

export const productSchema = object({
    id: number().integer().positive().required(),
    name: string().required().min(2).max(100),
    description: string().required(),
    category: object({
        id: number().integer().positive().required(),
        name: string().required().min(2).max(100),
    }),
    items: array(productItemSchema).required().min(1),
}).required();

export const productInputSchema = object({
    name: string().required().min(2).max(100),
    description: string().required(),
    categoryId: number().integer().positive().required(),
    items: array(productItemInputSchema).required().min(1),
}).required();

export type Product = InferType<typeof productSchema>;
export type ProductInput = InferType<typeof productInputSchema>;

export type ProductDto = {
    id: number;
    name: string;
    category: {
        name: string;
        id: number;
    };
    description: string;
    items: ProductItemDto[];
    createdAt: Date;
    updatedAt: Date;
}

export type ProductToCart = {
    productId: number,
    name: string,
    quantity: number,
    price: number,
    image: string,
    itemId: number,
    variations: { name: string, value: string }[]
};
  