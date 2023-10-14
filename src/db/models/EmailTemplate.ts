
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "email_template",
    modelName: "EmailTemplate",
})
export default class EmailTemplate extends Model{
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  public name!: string;

  @Column({ type: DataType.JSON, allowNull: false })
  public template!: Object;
}