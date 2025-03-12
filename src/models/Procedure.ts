
import { sequelize } from "../config/database";
import { Model, DataTypes } from "sequelize";
import { UserModel } from "./User";

class ProcedureModel extends Model {
  id!: string;
  name!: string;
  lastname!: string;
  email!: string;
  dni!: string;
  province!: string;
  city!: string;
  address!: string;
  postal_code!: number;
  telephone!: number;
  status!: string;
  detailed_document!: string;
  comments?: string;
  createdAt!: Date;
  updatedAt!: Date;
}

ProcedureModel.init(
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
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    province: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    detailed_document: {
      type: DataTypes.STRING(255),
    },
    status: {
      type: DataTypes.ENUM("approved", "pending", "rejected"),
      defaultValue: "pending",
    },
    comments: {
      type: DataTypes.STRING(255),
    },
  },
  {
    sequelize,
    modelName: "Procedure",
    tableName: "procedures",
    timestamps: true, 
  }
);

ProcedureModel.belongsTo(UserModel, { foreignKey: "id_user", as: "user" });

export { ProcedureModel };