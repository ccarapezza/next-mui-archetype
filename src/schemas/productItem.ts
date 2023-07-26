import { array, number, object, string, InferType } from 'yup';

export const productItemSchema = object({
  image: string().optional(),
  price: number().required().positive(),
  variation: array(
    object({
      name: string().required().max(100),
      value: string().required().max(100),
    })
  ).optional().min(1),
});

export type ProductItem = InferType<typeof productItemSchema>;