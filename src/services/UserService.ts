//Service object for Product Sequelize Model

import { Role, User } from "@/db";
import findAllSequelizePagination from "@/db/utils/pagination";
import { Op, WhereOptions } from "sequelize";
import { GenericService } from "./GenericService";
import { AdapterUser } from "next-auth/adapters";
import { Model } from "sequelize-typescript";

//UserService extends GenericService
export class UserService extends GenericService<User> {
    constructor() {
        super(User);
    }
    search= async (searchTerm: string | null, userType: string | null, page: number = 1, size: number = 10) => {
        let where: WhereOptions | undefined = undefined;
        let include: any[] | undefined = undefined;
        if (searchTerm) {
            where = {
                name: {
                    [Op.like]: `%${searchTerm}%`
                }
            }
        }

        if (userType) {
            include = [
                {
                    model: Role,
                    as: "_roles",
                    where: {
                        name: userType
                    }
                },
                {
                    model: Role,
                    as: "roles",
                }
            ]
        }

        const users = await findAllSequelizePagination({
            model: User,
            page: page,
            size: size,
            attributes: ['id', 'name', 'email', 'image', 'emailVerified'],
            include,
            where
        });

        return users;
    }
};

//UserService as a singleton
export const userService = new UserService();