import {
  Table,
  Column,
  DataType,
  Model,
  BelongsToMany
} from "sequelize-typescript";
import User from "./User";

@Table({
  tableName: "role",
  timestamps: true,
})
export default class Role extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  public name!: string;

  @BelongsToMany(() => User, {
    through: 'user_roles',
    foreignKey: 'roleId',
    otherKey: 'userId',
  })
  public users!: User[];
}