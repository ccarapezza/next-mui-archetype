import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany
} from "sequelize-typescript";
import Product from "./Product";
import VariationOption from "./VariationOption";

@Table({
  tableName: "product_item",
  timestamps: true,
})
export default class ProductItem extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  public sku!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public stock!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  public image!: string;

  @Column({ type: DataType.NUMBER, allowNull: false })
  public price!: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.NUMBER, allowNull: false })
  public masterProductId!: number;

  @BelongsTo(() => Product)
  public masterProduct!: Product;  

  @BelongsToMany(() => VariationOption, {
    through: 'product_configuration',
    foreignKey: 'productItemId',
    otherKey: 'variationOptionId',
  })
  public variationOptions!: VariationOption[];
}