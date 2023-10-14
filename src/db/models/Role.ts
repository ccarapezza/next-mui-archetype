import {
  Table,
  Column,
  DataType,
  Model
} from "sequelize-typescript";

@Table({
  tableName: "role",
  modelName: "Role",
  timestamps: true,
})
export default class Role extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  public name!: string;
}