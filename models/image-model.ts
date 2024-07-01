import {Model, DataTypes, Optional} from 'sequelize';
import {ImageInterface} from "../interface/Image.interface";
import sequelize from "../sequelize/database";

interface ImageCreationAttributes extends Optional<ImageInterface, 'imageId'> {}

class ImageModel extends Model<ImageInterface> implements ImageInterface {
    public imageId!: string;
    public data!: Buffer;
    public filename!: string;
}

ImageModel.init({
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
    tableName: 'Images',
    modelName: 'ImageModel',
    timestamps: true,
});

export default ImageModel;
