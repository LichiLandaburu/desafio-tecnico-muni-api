
import { sequelize } from "../config/database";
import { Model, DataTypes } from "sequelize";

export class UserModel extends Model {
  id!: string;
  name!: string;
  lastname!: string;
  email!: string;
  password!: string;
  dni!: string;
  birthday!: Date;
  role!: string;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true,
    },
    birthday: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true, 
  }
);