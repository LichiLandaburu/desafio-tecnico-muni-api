import { dbConnect } from "../config/database";
import { UserModel } from "../models/User";
import { seedData } from "./data";

(async() => {
  
  await dbConnect();
 
  await seed();


})();

async function seed() {
  
  // 1. Borrar todo
  await Promise.all([
    UserModel.destroy({ where: {} }),
  ]);
  
  // 2. Crear usuarios
  await UserModel.bulkCreate(seedData.users);

  console.log("SEEDED");

}
