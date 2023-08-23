//Service object for Role Sequelize Model
import { OrderLine, ProductItem, ShopOrder, VariationOption } from "@/db";
import findAllSequelizePagination from "@/db/utils/pagination";
import { GenericService } from "./GenericService";

//VariationService extends GenericService
export class ShopOrderService extends GenericService<ShopOrder> {
    constructor() {
        super(ShopOrder);
    }
    getPendingOrders = async (page: number = 1, size: number = 10) => {
        const data = await findAllSequelizePagination(
            {
                model: ShopOrder,
                page: page,
                size: size,
                include: [
                    {
                        model: OrderLine,
                        include: [
                            {
                                model: ProductItem,
                                include: [
                                    "masterProduct",
                                    {
                                        model: VariationOption,
                                        include: ["variation"]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                where: {
                    statusId: 1
                },
                order: [["createdAt", "DESC"]]
            }
        );
        return data;
    }
};

//VariationService as a singleton
export const shopOrderService = new ShopOrderService();