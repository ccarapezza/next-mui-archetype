import { array, object, string, InferType } from 'yup';
import { productItemSchema } from './productItem';

export const productSchema = object({
  name: string().required().min(2).max(100),
  description: string().required().min(2).max(100),
  category: string().required().min(2).max(100),
  items: array(productItemSchema).required().min(1),
}).required();

export type Product = InferType<typeof productSchema>;