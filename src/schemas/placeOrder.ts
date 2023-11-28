export type OrderItemDto = {
    productItemId: number;
    qty: number;
    price: number;
};

export type ContactFormDto = {
    name: string
    lastName: string
    phone: number
    email: string
};

export type PlaceOrderDto = {
    orderItems: OrderItemDto[];
    contactForm: ContactFormDto;
    checkoutDiscountsId: string | null;
};