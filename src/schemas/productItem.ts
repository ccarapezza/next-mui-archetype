import { array, number, object, string, InferType } from 'yup';

export const productItemSchema = object({
  image: string().optional(),
  price: number().required().min(0),
  variation: array(
    object({
      name: string().required().min(2).max(100),
      value: string().required().min(2).max(100),
    })
  ).optional().min(1),
});

export type ProductItem = InferType<typeof productItemSchema>;