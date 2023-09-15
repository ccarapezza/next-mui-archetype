import {
    Table,
    Column,
    DataType,
    Model
} from "sequelize-typescript";

@Table({
    tableName: "faq_editor",
    timestamps: true,
})
export default class FaqEditor extends Model {
    @Column({ type: DataType.TEXT, allowNull: false })
    public ask!: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    public answer!: string;
}