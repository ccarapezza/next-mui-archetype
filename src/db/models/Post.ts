import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
  ForeignKey
} from "sequelize-typescript";
import User from "./User";

@Table({
  tableName: "posts",
  timestamps: true,
})
export default class Post extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  public title!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  public content!: string;
  /* Associantions */
  // User
  @BelongsTo(() => User)
  public user!: User;

  @ForeignKey(() => User)
  @Column({type: DataType.UUID})
  public userId?: string;
  // End User
  
}