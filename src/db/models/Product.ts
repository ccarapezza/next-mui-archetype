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
import ProductItem from "./ProductItem";

@Table({
  tableName: "product",
  timestamps: true,
})
export default class Product extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  public name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public description!: string;

  @ForeignKey(() => ProductCategory)
  @Column({ type: DataType.INTEGER, allowNull: false })
  public categoryId!: number;

  @BelongsTo(() => ProductCategory)
  public category!: ProductCategory;

  @HasMany(() => ProductItem)
  public items!: ProductItem[];
}