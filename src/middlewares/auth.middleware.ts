import { NextFunction, Request, Response } from "express";
import { validateToken } from "../config/jwt";
import { UserModel } from "../models/User";
import { envs } from "../config/envs";

export async function validateJWT (req: Request, res: Response, next: NextFunction) {

  const authorization = req.header("Authorization");

  if (!authorization) return res.status(401).json({ error: "No token provided" });
  if (!authorization.startsWith("Bearer ")) return res.json(401).json({ error: "Invalid Bearer token" });

  const token = req.cookies.accessToken || authorization.split(" ").at(1);

  try {

    const payload = await validateToken<{ id: string }>(token, envs.ACCESS_TOKEN_SEED);
    
    if (!payload) return res.status(401).json({ error: "Invalid token" });

    const user = await UserModel.findByPk(payload.id);
    if (!user) return res.status(401).json({ error: "Invalid token - user not found" });

    req.body.user = user;

    next();
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" }); 
  }
}
