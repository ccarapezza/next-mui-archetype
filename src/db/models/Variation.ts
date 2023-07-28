import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany
} from "sequelize-typescript";
import ProductCategory from "./ProductCategory";
import VariationOption from "./VariationOption";

@Table({
  tableName: "variation",
  timestamps: true,
})
export default class Variation extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  public name!: string;

  @ForeignKey(() => ProductCategory)
  @Column({ type: DataType.INTEGER })
  public categoryId!: number;

  @BelongsTo(() => ProductCategory)
  public category!: ProductCategory;

  @HasMany(() => VariationOption)
  public variationOptions!: VariationOption[];

}