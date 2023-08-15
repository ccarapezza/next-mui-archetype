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
    search = async (searchTerm: string | null) => {
        let where : WhereOptions | undefined = undefined;
        if (searchTerm) {
            where = {
                name: {
                    [Op.like]: `%${searchTerm}%`
                }
            }
        }
        const data = await Variation.findAndCountAll({ distinct: true, include: ["variationOptions"], where });
        return data.rows.map((item) => item.toJSON());
    }
};

//VariationService as a singleton
export const variationService = new VariationService();