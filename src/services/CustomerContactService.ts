//Service object for Role Sequelize Model
import { CustomerContact, CustomerContactStatus } from "@/db";
import { GenericService } from "./GenericService";
import { Op, Sequelize, WhereOptions } from "sequelize";
import findAllSequelizePagination from "@/db/utils/pagination";

//RoleService extends GenericService
export class CustomerContactService extends GenericService<CustomerContact> {
    constructor() {
        super(CustomerContact);
    }

    search = async (searchTerm: string | null, page: number = 1, size: number = 10, statusId: number) => {
        
        const listCustomerContact = await findAllSequelizePagination({
            model: CustomerContact,
            page: page,
            size: size,
            attributes: ['id', 'name', 'lastname', 'phone', 'email', 'message', 'statusId', 'answer', 'owner', 'createdAt'],
            include: [
                'status'
            ],
            where: {
                statusId: {
                    [Op.like]: `%${statusId}%`
                }
            },
            order: [
                ['createdAt', 'DESC'],
            ],
        });

        const listCustomerContactDto: any = listCustomerContact.rows.map((customer) => {
            return customer
        })

        return {
            ...listCustomerContact,
            rows: listCustomerContactDto
        }
    }

};

//RoleService as a singleton
export const customerContactStatus = new CustomerContactService();