import { Includeable, Order, WhereOptions } from "sequelize";
import { Model, ModelCtor } from "sequelize-typescript";

export default async function findAllSequelizePagination({ model, page = 1, size = 10, attributes, include, where, order, json = true }: {
    model: ModelCtor<Model>;
    page: number;
    size: number;
    attributes?: string[];
    include?: Includeable | Includeable[] | undefined;
    where?: WhereOptions;
    order?: Order;
    json?: boolean;
  }): Promise<{ totalItems: number; rows: Model[]; totalPages: number; currentPage: number }> {
    
    const getPagination = (page:number, size:number) => {
        const indexPage = page ? page - 1 : 0;
        const limit = +size;
        const offset = indexPage ? indexPage * limit : 0;
      
        return { limit, offset };
    };

    const getPagingData = (data:any, page:number, limit:number) => {
        const { count: totalItems, rows } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
      
        return { totalItems, rows, totalPages, currentPage };
    };

    const { limit, offset } = getPagination(page, size);
    const data = await model.findAndCountAll({ distinct: true, attributes, include, where, order, limit, offset});
    return getPagingData(
        {
            ...data,
            rows: json ? data.rows.map((row:any) => row.toJSON()) : data.rows
        },
        page,
        limit
    );
}