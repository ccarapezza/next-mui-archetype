import {
    Table,
    Column,
    DataType,
    Model,
} from "sequelize-typescript";

@Table({
    tableName: "checkout_discounts",
    timestamps: true,
    paranoid: true, // Habilita el "soft delete"
    modelName: "CheckoutDiscounts"
})
export default class CheckoutDiscounts extends Model {
    static findAllSequelizePagination(arg0: { attributes: string[]; include: string[]; order: (string | import("sequelize/types/utils").Literal)[][]; }) {
        throw new Error("Method not implemented.");
    }
    @Column({ type: DataType.STRING, allowNull: false })
    public name!: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    public active!: boolean;

    @Column({ type: DataType.STRING, allowNull: false })
    public coupon!: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    public value!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    public coupon_type!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    public application_type!: string;

    @Column({ type: DataType.INTEGER, allowNull: true })
    public uses_per_user!: number;

    @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
    public deletedAt!: Date; // Nuevo campo para "soft delete"
}