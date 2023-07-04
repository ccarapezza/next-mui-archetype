
import { AdapterSession } from "next-auth/adapters";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Session as SessionDefinition } from "@next-auth/sequelize-adapter/dist/models";
import User from "./User";

@Table({
    timestamps: true,
    tableName: "sessions",
})
export default class Session extends Model<AdapterSession, Partial<AdapterSession>>{

    @Column({...SessionDefinition.id})
    declare public id: string;

    @Column({...SessionDefinition.sessionToken})
    public sessionToken!: string;

    @Column({...SessionDefinition.expires})
    public expires!: Date;

    /* Associantions */
    // User
    @BelongsTo(() => User)
    public user!: User;

    @ForeignKey(() => User)
    @Column({...SessionDefinition.userId})
    public userId?: string;
    // End User
}