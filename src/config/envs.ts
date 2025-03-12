import "dotenv/config";
import { get } from "env-var";


export const envs = {

  PORT: get("PORT").required().asPortNumber(),

  DB_USER: get("DB_USER").required().asString(),
  DB_PASSWORD: get("DB_PASSWORD").asString(),
  DB_NAME: get("DB_NAME").required().asString(),

  FTP_USER: get("FTP_USER").required().asString(),
  FTP_PASSWORD: get("FTP_PASSWORD").required().asString(),
  FTP_HOST: get("FTP_HOST").required().asString(),
  FTP_PORT: get("FTP_PORT").required().asPortNumber(),

  ACCESS_TOKEN_SEED: get("ACCESS_TOKEN_SEED").required().asString(),
  REFRESH_TOKEN_SEED: get("REFRESH_TOKEN_SEED").required().asString(),

} 


