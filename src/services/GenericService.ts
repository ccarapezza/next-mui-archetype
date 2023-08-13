import { WhereOptions } from "sequelize";
import { Model } from "sequelize-typescript";

//interface
export interface IGenericService<T extends Model> {
    getAll: () => Promise<T[]>;
    getById: (id: number | string) => Promise<T | null>;
    create: (item: any) => Promise<T>;
    update: (id: number, item: any) => Promise<[affectedCount: number]>;
    delete: (id: number) => Promise<number>;
}

//Generic Service class for Sequelize Model. Using generics. this will be use for all models
export class GenericService<T extends Model> implements IGenericService<T> {
    constructor(protected model: {new(): T} & typeof Model) {
        this.model = model;
    }

    //Get all items
    getAll = async () => {
        return await this.model.findAll() as T[];
    };
    //Get an item by id
    getById = async (id: number | string) => {
        return await this.model.findByPk(id) as T;
    };
    //Create a new item
    create = async (item: any) => {
        return await this.model.create(item) as T;
    };
    //Update an item
    update = async (id: number, item: any) => {
        const where = {
            id: id
        }
        return await this.model.update(
            item,
            {
                where
            }
        );
    };
    //Delete an item
    delete = async (id: number) => {
        const where = {
            id: id
        }
        return await this.model.destroy({
            where,
        });
    };
}