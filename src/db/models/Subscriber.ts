
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "subscriber",
})
export default class Subscriber extends Model{

  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  declare public id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  public email!: string;
}