import {Model, DataTypes, Optional} from 'sequelize';
import {ImageInterface} from "../interface/Image.interface";
import sequelize from "../sequelize/database";

interface ImageCreationAttributes extends Optional<ImageInterface, 'imageId'> {}

class Image extends Model<ImageInterface, ImageCreationAttributes> implements ImageInterface {
    public imageId!: string;
    public data!: Buffer;
    public filename!: string;
}

Image.init({
    imageId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data: {
        type: DataTypes.BLOB('long'),
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'images',
});

export default Image;
