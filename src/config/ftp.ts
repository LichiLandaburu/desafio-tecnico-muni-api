import { Client } from "basic-ftp";
import { envs } from "./envs";

const ftpConfig = {
  host: envs.FTP_HOST,
  port: envs.FTP_PORT,
  user: envs.FTP_USER,
  password: envs.FTP_PASSWORD,
  secure: true,
  secureOptions: { rejectUnauthorized: false }
}

export async function connectToFTP (): Promise<Client> {
  const client = new Client();
  client.ftp.verbose = true;

  try {
    await client.access(ftpConfig);
    console.log("Connected to FTP server");
    return client;
  }
  catch (error) {
    console.error("Error connecting to FTP server:", error);
    client.close();
    throw error;
  }
}