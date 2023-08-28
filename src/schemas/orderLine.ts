import { ProductItemDto } from './productItem';

export type OrderLineDto = {
    id: number;
    item: ProductItemDto;
    itemId: number;
    orderId: number;
    qty: number;
    price: number;
}