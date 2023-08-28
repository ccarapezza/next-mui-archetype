import { array, object, string, InferType, number } from 'yup';
import { ProductItemDto, productItemInputSchema, productItemSchema } from './productItem';
import { ContactForm, OrderStatus, User } from '@/db';
import { OrderLineDto } from './orderLine';

export type ShopOrderDto = {
    id: number;
    orderDate: Date;
    orderTotal: Number;
    user: User;
    userId?: string;
    status: OrderStatus;
    statusId?: number;
    contactForm: ContactForm;
    contactFormId: number;
    orderLines: OrderLineDto[];
}