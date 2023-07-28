import { array, object, string, InferType, number } from 'yup';
import { productItemInputSchema, productItemSchema } from './productItem';

export const productSchema = object({
  name: string().required().min(2).max(100),
  description: string().required().min(2).max(100),
  category: object({
    id: number().integer().positive().required(),
    name: string().required().min(2).max(100),
  }),
  items: array(productItemSchema).required().min(1),
}).required();

export const productInputSchema = object({
    name: string().required().min(2).max(100),
    description: string().required().min(2).max(100),
    categoryId: number().integer().positive().required(),
    items: array(productItemInputSchema).required().min(1),
  }).required();

export type Product = InferType<typeof productSchema>;
export type ProductInput = InferType<typeof productInputSchema>;