import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";
import ProductCategory from "./ProductCategory";

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

}