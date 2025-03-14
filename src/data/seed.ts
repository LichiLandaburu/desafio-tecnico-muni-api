import { dbConnect, sequelize } from "../config/database";
import { ProcedureModel } from "../models/Procedure";
import { UserModel } from "../models/User";
import { seedData } from "./data";

(async() => {
  
  await dbConnect();
 
  await seed();

  await sequelize.close();

})();

async function seed() {
  
  // 1. Borrar todo
  await Promise.all([
    UserModel.destroy({ where: {} }),
    ProcedureModel.destroy({ where: {}  })
  ]);
  
  // 2. Crear usuarios
  const users = await UserModel.bulkCreate(seedData.users);
  const usersId = users.map(user => user.dataValues.id);

  // 3. Crear tramites 
  const newProcedures = seedData.procedures.map(tramite => ({
    ...tramite,
    id_user: usersId[Math.floor(Math.random() * usersId.length)]
  }));
  await ProcedureModel.bulkCreate(newProcedures);

  console.log("SEEDED");

}
