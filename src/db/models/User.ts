
import { BelongsToManyAddAssociationMixin } from 'sequelize';
import { AdapterUser } from "next-auth/adapters";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User as UserDefinition } from "@next-auth/sequelize-adapter/dist/models";
import Role from "./Role";


@Table({
  tableName: "users",
  timestamps: true
})
export default class User extends Model{

  @Column({...UserDefinition.id})
  declare public id: string;

  @Column({...UserDefinition.name})
  public name?: string | null | undefined;

  @Column({...UserDefinition.email})
  public email!: string;

  @Column({...UserDefinition.emailVerified})
  public emailVerified!: Date | null;

  @Column({type: DataType.STRING, allowNull: true})
  public password?: string;

  @Column({...UserDefinition.image})
  public image?: string | null | undefined;

  @BelongsToMany(() => Role, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId',
  })
  public roles?: Role[];

  @BelongsToMany(() => Role, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId',
  })
  public _roles?: Role[];
  declare addRole: BelongsToManyAddAssociationMixin<Role, number>;
  declare addRoles: BelongsToManyAddAssociationMixin<Role[], number>;
  declare getRoles: () => Promise<Role[]>;
}