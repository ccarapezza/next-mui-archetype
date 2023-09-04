import {
    Table,
    Column,
    DataType,
    Model
} from "sequelize-typescript";

@Table({
    tableName: "image_container",
    timestamps: true,
})
export default class ImageContainer extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    public code!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    public key!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    public title!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    public buttonLabel!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    public link!: string;
}