import {DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../sequelize/database';
import {UserInterface} from "../interface/User.interface";

interface UserCreationAttributes extends Optional<UserInterface, 'userId'> {}

class User extends Model<UserInterface, UserCreationAttributes> implements UserInterface {
    public userId!: string;
    public name!: string;
    public email!: string;
}

User.init({
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize,
    tableName: 'Users',
    modelName: 'User',
    timestamps: true,
});

export default User;
