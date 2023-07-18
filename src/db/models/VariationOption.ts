import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";
import Variation from "./Variation";

@Table({
  tableName: "variation_option",
  timestamps: true,
})
export default class VariationOption extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  public value!: string;

  @ForeignKey(() => Variation)
  @Column({ type: DataType.INTEGER, allowNull: false })
  public variationId!: number;

  @BelongsTo(() => Variation)
  public variation!: Variation;

}