import {
    Table,
    Column,
    DataType,
    Model,
    BelongsTo,
    ForeignKey,
    HasMany
} from "sequelize-typescript";
import User from "./User";
import OrderStatus from "./OrderStatus";
import OrderLine from "./OrderLine";
import ContactForm from "./ContactForm";

@Table({
    tableName: "shop_order",
    timestamps: true,
    modelName: "ShopOrder"
})
export default class ShopOrder extends Model {
    @Column({ type: DataType.DATE, allowNull: false })
    public orderDate!: Date;

    @Column({ type: DataType.NUMBER, allowNull: false })
    public orderTotal!: Number;

    /* Associantions */
    // User
    @BelongsTo(() => User)
    public user!: User;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    public userId?: string;
    // End User

    /* Associantions */
    // OrderStatus
    @BelongsTo(() => OrderStatus)
    public status!: OrderStatus;

    @ForeignKey(() => OrderStatus)
    @Column({ type: DataType.NUMBER })
    public statusId?: number;
    // End OrderStatus

    // ContactForm
    @BelongsTo(() => ContactForm)
    public contactForm!: ContactForm;

    @ForeignKey(() => ContactForm)
    @Column({ type: DataType.NUMBER })
    public contactFormId?: number;
    // End ContactForm

    @HasMany(() => OrderLine)
    public orderLines!: OrderLine[];
}