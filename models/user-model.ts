import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../sequelize/database';
import { UserInterface } from "../interface/User.interface";

interface UserCreationAttributes extends Optional<UserInterface, 'userId'> {}

class UserModel extends Model<UserInterface, UserCreationAttributes> implements UserInterface {
    public userId!: string;
    public name!: string;
    public email!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserModel.init({
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Name is required'
            },
            notEmpty: {
                msg: 'Name cannot be empty'
            },
            len: {
                args: [2, 100],
                msg: 'Name must be between 2 and 100 characters'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Email is required'
            },
            notEmpty: {
                msg: 'Email cannot be empty'
            },
            isEmail: {
                msg: 'Must be a valid email address'
            }
        }
    }
}, {
    sequelize,
    tableName: 'Users',
    modelName: 'UserModel',
    timestamps: true,
});

export default UserModel;
