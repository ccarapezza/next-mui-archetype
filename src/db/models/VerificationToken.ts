
import { AdapterSession } from "next-auth/adapters";
import { Column, Model, Table } from "sequelize-typescript";
import { VerificationToken as VerificationTokenDefinition } from "@next-auth/sequelize-adapter/dist/models";

@Table({
  tableName: "verification_tokens",
  timestamps: true,
})
export default class VerificationToken extends Model<AdapterSession, Partial<AdapterSession>>{

  @Column({ ...VerificationTokenDefinition.identifier })
  public identifier!: string;

  @Column({ ...VerificationTokenDefinition.expires })
  public expires!: Date;

  @Column({ ...VerificationTokenDefinition.token })
  public token!: string;
}