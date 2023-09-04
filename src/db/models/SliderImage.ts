import {
    Table,
    Column,
    DataType,
    Model
} from "sequelize-typescript";

@Table({
    tableName: "slider_image",
    timestamps: true,
})
export default class SliderImage extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    public key!: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
    public visible!: boolean;

    @Column({ type: DataType.STRING, allowNull: true })
    public link!: string;
}