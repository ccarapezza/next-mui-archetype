import { CustomerContactStatusDto } from "./customerContactStatus";

export type CustomerContactDto = {
    id: number;
    name: string;
    lastname: string;
    phone: string;
    email: string;
    message: string;
    status: CustomerContactStatusDto;
    answer: string;
    owner: string;
    createdAt: Date;
};