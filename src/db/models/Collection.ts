
import { BelongsToManyAddAssociationMixin } from 'sequelize';
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import Product from './Product';

@Table({
    tableName: "collection",
    modelName: "Collection",
    timestamps: true
})
export default class Collection extends Model {

    @Column({ type: DataType.STRING, allowNull: true })
    public name?: string;

    @BelongsToMany(() => Product, {
        through: 'collection_products',
        foreignKey: 'collectionId',
        otherKey: 'productId',
    })
    public products?: Product[];

    declare addProduct: BelongsToManyAddAssociationMixin<Product, number>;
    declare addProducts: BelongsToManyAddAssociationMixin<Product[], number>;
    declare getProducts: () => Promise<Product[]>;
}