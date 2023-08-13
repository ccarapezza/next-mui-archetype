//Service object for Subscriber Sequelize Model
import {  Subscriber } from "@/db";
import findAllSequelizePagination from "@/db/utils/pagination";
import { Op, WhereOptions } from "sequelize";
import { GenericService } from "./GenericService";

//SubscriberService extends GenericService
export class SubscriberService extends GenericService<Subscriber> {
    constructor() {
        super(Subscriber);
    }
    search = async (searchTerm: string | null, page: number = 1, size: number = 10) => {
        let where : WhereOptions | undefined = undefined;
        if (searchTerm) {
            where = {
                email: {
                    [Op.like]: `%${searchTerm}%`
                }
            }
        }
        const subscribers = await findAllSequelizePagination({
            model: Subscriber,
            page: page,
            size: size,
            attributes: ['id', 'email'],
            where
        });

        return subscribers;
    }
};

//SubscriberService as a singleton
export const subscriberService = new SubscriberService();