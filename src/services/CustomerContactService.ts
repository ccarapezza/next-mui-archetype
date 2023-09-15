//Service object for Role Sequelize Model
import { CustomerContact, CustomerContactStatus } from "@/db";
import { GenericService } from "./GenericService";

//RoleService extends GenericService
export class CustomerContactService extends GenericService<CustomerContact> {
    constructor() {
        super(CustomerContact);
    }

    getAllCustomerContactDto = async () => {
        const listFaq = await CustomerContact.findAll({
            attributes: ['id', 'name', 'lastname', 'phone', 'email', 'message', 'statusId'],
        });

        const listCustomerContactDto = listFaq.map((customer) => {
            return {
                id: customer.id,
                name: customer.name,
                lastname: customer.lastname,
                phone: customer.phone,
                email: customer.email,
                message: customer.message,
                statusId: customer.statusId,
            }
        })

        return listCustomerContactDto;
    }

};

//RoleService as a singleton
export const customerContactStatus = new CustomerContactService();