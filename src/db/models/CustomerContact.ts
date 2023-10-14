import {
    Table,
    Column,
    DataType,
    Model,
    BelongsTo,
    ForeignKey
} from "sequelize-typescript";
import CustomerContactStatus from "./CustomerContactStatus";

@Table({
    tableName: "customer_contact",
    timestamps: true,
    modelName: "CustomerContact"
})
export default class CustomerContact extends Model {
    static findAllSequelizePagination(arg0: { attributes: string[]; include: string[]; order: (string | import("sequelize/types/utils").Literal)[][]; }) {
        throw new Error("Method not implemented.");
    }
    @Column({ type: DataType.STRING, allowNull: false })
    public name!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    public lastname!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    public email!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    public phone!: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    public message!: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    public answer!: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    public owner!: string;

    // CustomerContactStatus
    @BelongsTo(() => CustomerContactStatus)
    public status!: CustomerContactStatus;

    @ForeignKey(() => CustomerContactStatus)
    @Column({ type: DataType.NUMBER })
    public statusId?: number;
    // End CustomerContactStatus
}