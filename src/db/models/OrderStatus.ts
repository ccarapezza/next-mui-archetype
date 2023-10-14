import {
  Table,
  Column,
  DataType,
  Model
} from "sequelize-typescript";

@Table({
  tableName: "order_status",
  timestamps: true,
    modelName: "OrderStatus"
})
export default class OrderStatus extends Model {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  public status!: string;
}