//Service object for Role Sequelize Model
import { Role } from "@/db";
import findAllSequelizePagination from "@/db/utils/pagination";
import { Op, WhereOptions } from "sequelize";
import { GenericService } from "./GenericService";

//RoleService extends GenericService
export class RoleService extends GenericService<Role> {
    constructor() {
        super(Role);
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
            model: Role,
            page: page,
            size: size,
            attributes: ['id', 'name'],
            where
        });

        return roles;
    }
};

//RoleService as a singleton
export const roleService = new RoleService();