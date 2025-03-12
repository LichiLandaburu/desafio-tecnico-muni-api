import "dotenv/config";
import { get } from "env-var";


export const envs = {

  PORT: get("PORT").required().asPortNumber(),

  DB_USER: get("DB_USER").required().asString(),
  DB_PASSWORD: get("DB_PASSWORD").asString(),
  DB_NAME: get("DB_NAME").required().asString(),

  ACCESS_TOKEN_SEED: get("ACCESS_TOKEN_SEED").required().asString(),
  REFRESH_TOKEN_SEED: get("REFRESH_TOKEN_SEED").required().asString(),

} 


