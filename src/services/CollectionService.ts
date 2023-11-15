//Service object for Collection Sequelize Model
import { Collection } from "@/db";
import findAllSequelizePagination from "@/db/utils/pagination";
import { Op, WhereOptions } from "sequelize";
import { GenericService } from "./GenericService";

//CollectionService extends GenericService
export class CollectionService extends GenericService<Collection> {
    constructor() {
        super(Collection);
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
        const collections = await findAllSequelizePagination({
            model: Collection,
            page: page,
            size: size,
            attributes: ['id', 'name'],
            include: ['products'],
            where
        });

        return collections;
    }
};

//CollectionService as a singleton
export const collectionService = new CollectionService();