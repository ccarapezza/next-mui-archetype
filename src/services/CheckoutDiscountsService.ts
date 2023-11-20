//Service object for GenericService Sequelize Model
import { CheckoutDiscounts } from "@/db";
import { GenericService } from "./GenericService";
import findAllSequelizePagination from "@/db/utils/pagination";

//CheckoutDiscounts extends GenericService
export class CheckoutDiscountsService extends GenericService<CheckoutDiscounts> {
    constructor() {
        super(CheckoutDiscounts);
    }
    search = async (searchTerm: string | null, page: number = 1, size: number = 10) => {
        const listCheckoutDiscounts = await findAllSequelizePagination({
            model: CheckoutDiscounts,
            page: page,
            size: size,
            attributes: ['id', 'name', 'active', 'coupon', 'value', 'coupon_type', 'application_type', 'uses_per_user']
        });
        return {
            ...listCheckoutDiscounts
        }
    }
};

//CheckoutDiscounts as a singleton
export const checkoutDiscountsService = new CheckoutDiscountsService();