import {
    Table,
    Column,
    DataType,
    Model
} from "sequelize-typescript";

@Table({
    tableName: "contact_form",
    timestamps: true,
})
export default class ContactForm extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    public name!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    public lastName!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    public email!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    public phone!: string;
}