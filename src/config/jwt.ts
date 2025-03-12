import jwt from "jsonwebtoken";
import { envs } from "./envs";

const ACCESS_TOKEN_SEED = envs.ACCESS_TOKEN_SEED || "access-token-seed";
const REFRESH_TOKEN_SEED = envs.REFRESH_TOKEN_SEED || "refresh-token-seed";

export async function generateAccessToken(payload: Object, duration: string = "15m"): Promise<string | null> {
  return new Promise((resolve) => {

    jwt.sign(payload, ACCESS_TOKEN_SEED, { expiresIn: duration }, (err, token) => {
      
      if (err) return resolve(null);
      
      resolve(token!);
    
    });
  });
}

export async function generateRefreshToken(payload: Object, duration: string = "7d"): Promise<string | null> {
  return new Promise((resolve) => {

    jwt.sign(payload, REFRESH_TOKEN_SEED, { expiresIn: duration }, (err, token) => {
      
      if (err) return resolve(null);
      
      resolve(token!);
    
    });
  });
}

export async function validateToken<T>(token: string, secret: string): Promise<T | null> { 
  return new Promise((resolve) => {
    jwt.verify(token, secret, (err, decoded) => {
      
      if (err) return resolve(null);
    
      resolve(decoded as T);
    });
  });
}
