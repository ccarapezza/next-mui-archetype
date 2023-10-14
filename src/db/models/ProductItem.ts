import { BelongsToManyAddAssociationsMixin } from 'sequelize';
import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
  BelongsToMany
} from "sequelize-typescript";
import Product from "./Product";
import VariationOption from "./VariationOption";

@Table({
  tableName: "product_item",
  timestamps: true,
  modelName: "ProductItem",
})
export default class ProductItem extends Model {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  public sku!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public stock!: number;

  @Column({ type: DataType.JSON, allowNull: true })
  public image?: string[];

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

  declare addVariationOptions: BelongsToManyAddAssociationsMixin<VariationOption, number>;
}