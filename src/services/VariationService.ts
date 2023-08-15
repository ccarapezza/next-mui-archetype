//Service object for Role Sequelize Model
import { Role, Variation } from "@/db";
import findAllSequelizePagination from "@/db/utils/pagination";
import { Op, WhereOptions } from "sequelize";
import { GenericService } from "./GenericService";

//VariationService extends GenericService
export class VariationService extends GenericService<Variation> {
    constructor() {
        super(Variation);
    }
    search = async (searchTerm: string | null, page: number = 1, size: number = 10) => {
        let where : WhereOptions | undefined = undefined;
        if (searchTerm) {
            where = {
                name: {
                    [Op.like]: `%${searchTerm}%`
                }
            }
        }
        const roles = await findAllSequelizePagination({
            model: Variation,
            page: page,
            size: size,
            attributes: ['id', 'name'],
            where
        });

        return roles;
    }
};

//VariationService as a singleton
export const variationService = new VariationService();