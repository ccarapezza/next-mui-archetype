
import { VerificationToken as  VerificationTokenAdapter} from "next-auth/adapters";
import { Column, Model, Table } from "sequelize-typescript";
import { VerificationToken as VerificationTokenDefinition } from "@next-auth/sequelize-adapter/dist/models";

@Table({
  tableName: "verification_tokens",
  timestamps: true,
  modelName: "VerificationToken"
})
export default class VerificationToken extends Model<VerificationTokenAdapter, Partial<VerificationTokenAdapter>>{

  @Column({ ...VerificationTokenDefinition.identifier })
  public identifier!: string;

  @Column({ ...VerificationTokenDefinition.expires })
  public expires!: Date;

  @Column({ ...VerificationTokenDefinition.token })
  public token!: string;
}