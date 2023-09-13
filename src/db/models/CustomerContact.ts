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
})
export default class CustomerContact extends Model {
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

    // OrderStatus
    @BelongsTo(() => CustomerContactStatus)
    public status!: CustomerContactStatus;

    @ForeignKey(() => CustomerContactStatus)
    @Column({ type: DataType.NUMBER })
    public statusId?: number;
    // End OrderStatus
}