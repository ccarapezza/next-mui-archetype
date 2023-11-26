import {
    Table,
    Column,
    DataType,
    Model,
    BelongsTo,
    ForeignKey,
} from "sequelize-typescript";
import CheckoutDiscounts from "./CheckoutDiscounts";
import ShopOrder from "./ShopOrder";
import User from "./User";


@Table({
    tableName: "discounts_applied",
    timestamps: true,
    modelName: "DiscountsApplied"
})
export default class DiscountsApplied extends Model {
    static findAllSequelizePagination(arg0: { attributes: string[]; include: string[]; order: (string | import("sequelize/types/utils").Literal)[][]; }) {
        throw new Error("Method not implemented.");
    }

    /* Associantions */
    // CheckoutDiscounts
    @BelongsTo(() => CheckoutDiscounts)
    public checkout_discounts!: CheckoutDiscounts;

    @ForeignKey(() => CheckoutDiscounts)
    @Column({ type: DataType.NUMBER })
    public checkoutDiscountsId?: number;
    // End CheckoutDiscounts

    /* Associantions */
    // ShopOrder
    @BelongsTo(() => ShopOrder)
    public shop_order!: ShopOrder;
    
    @ForeignKey(() => ShopOrder)
    @Column({ type: DataType.NUMBER })
    public orderId?: number;
    // End CheckoutDiscounts

    /* Associantions */
    // User
    @BelongsTo(() => User)
    public user!: User;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: true})
    public userId?: string;
    // End User

}