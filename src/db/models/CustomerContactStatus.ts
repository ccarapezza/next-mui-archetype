import {
    Table,
    Column,
    DataType,
    Model
  } from "sequelize-typescript";
  
  @Table({
    tableName: "customer_contact_status",
    timestamps: true,
    modelName: "CustomerContactStatus"
  })
  export default class CustomerContactStatus extends Model {
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    public name!: string;
  }