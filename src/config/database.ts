
import { Sequelize } from "sequelize";
import { envs } from "./envs";

const sequelize = new Sequelize(
  envs.DB_NAME,
  envs.DB_USER,
  envs.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    logging: false
  }
);


const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connection has been established successfully.");
    
    await sequelize.sync({ force: false });
    console.log("MySQL tables created");
  }
  catch (error: any) {
    console.error("Error de conexion: " + error);
    throw new Error(error);
  }
}

export { sequelize, dbConnect };
