import {
    Table,
    Column,
    DataType,
    Model,
    BelongsTo,
    ForeignKey
} from "sequelize-typescript";
import ProductItem from "./ProductItem";
import ShopOrder from "./ShopOrder";

@Table({
    tableName: "order_line",
    timestamps: true,
    modelName: "OrderLine"
})
export default class OrderLine extends Model {
    /* Associantions */
    // ProductItem
    @BelongsTo(() => ProductItem)
    public item!: ProductItem;

    @ForeignKey(() => ProductItem)
    @Column({ type: DataType.NUMBER })
    public itemId?: number;
    // End ProductItem

    /* Associantions */
    // ShopOrder
    @BelongsTo(() => ShopOrder)
    public order!: ShopOrder;

    @ForeignKey(() => ShopOrder)
    @Column({ type: DataType.NUMBER })
    public orderId?: number;
    // End ShopOrder

    @Column({ type: DataType.NUMBER, allowNull: false })
    public qty!: number;

    @Column({ type: DataType.NUMBER, allowNull: false })
    public price!: number;
}