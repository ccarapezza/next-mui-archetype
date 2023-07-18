import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany
} from "sequelize-typescript";

@Table({
  tableName: "product_category",
  timestamps: true,
})
export default class ProductCategory extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  public name!: string;

  @ForeignKey(() => ProductCategory)
  @Column({ type: DataType.STRING, allowNull: false })
  public parentId!: number;

  @BelongsTo(() => ProductCategory)
  public parentCategory!: ProductCategory;

  @HasMany(() => ProductCategory)
  public childrens!: ProductCategory[];
  
}