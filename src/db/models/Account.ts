
import { AdapterAccount } from "next-auth/adapters";
import { ProviderType } from "next-auth/providers";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Account as AccountDefinition } from "@next-auth/sequelize-adapter/dist/models";
import User from "./User";

@Table({
  timestamps: true,
  tableName: "accounts",
})
export default class Account extends Model<AdapterAccount, Partial<AdapterAccount>>{

  @Column({...AccountDefinition.id})
  declare public id: string;
  
  @Column({...AccountDefinition.providerAccountId})
  public providerAccountId?: string;
  
  @Column({...AccountDefinition.provider})
  public provider?: string;
  
  @Column({...AccountDefinition.type})
  public type?: ProviderType;
  
  @Column({...AccountDefinition.access_token})
  public access_token?: string | undefined;
  
  @Column({...AccountDefinition.token_type})
  public token_type?: string | undefined;
  
  @Column({...AccountDefinition.id_token})
  public id_token?: string | undefined;
  
  @Column({...AccountDefinition.refresh_token})
  public refresh_token?: string | undefined;
  
  @Column({...AccountDefinition.scope})
  public scope?: string | undefined;
  
  @Column({...AccountDefinition.expires_at})
  public expires_at?: number | undefined;
  
  @Column({...AccountDefinition.session_state})
  public session_state?: string | undefined;
  
  /* Associantions */
  // User
  @BelongsTo(() => User)
  public user!: User;

  @ForeignKey(() => User)
  @Column({...AccountDefinition.userId})
  public userId?: string;
  // End User
}