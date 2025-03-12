import { Request, Response } from "express";
import { UserModel } from "../models/User";
import { compare, hash } from "../config/bcrypt";
import { generateAccessToken, generateRefreshToken, validateToken } from "../config/jwt";
import { envs } from "../config/envs";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.findAll({
      attributes: { exclude: ["password"] }
    });
    res.json({ users });
  } 
  catch (error) {
    res.status(500).json({ error: "Error getting users: " + error });
  }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ["password"] }
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({ user });
  } 
  catch (error) {
    res.status(500).json({ error: "Error getting user: " + error });
  }
}

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, lastname, email, password, dni, birthday, role } = req.body; 

    if (!name || !lastname || !email || !password || !dni || !birthday) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    
    const existingEmail = await UserModel.findOne({ where: { email } });
    if (existingEmail) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }

    const existingDNI = await UserModel.findOne({ where: { dni } });
    if (existingDNI) {
      res.status(400).json({ error: "DNI already exists" });
      return;
    }

    const hashPassword = hash(password);

    const newUser = await UserModel.create({ name, lastname, email, password: hashPassword, dni, birthday, role });
        
    res.status(201).json({ data: newUser });
  } 
  catch (error) {
    res.status(500).json({ error: "Error creating user: " + error });
  }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const { name, lastname, email, dni, birthday, role } = req.body;
    
    const user = await UserModel.findByPk(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    
    await UserModel.update({ name, lastname, email, dni, birthday, role, updatedAt: new Date() }, { where: { id } });
    
    res.json({ message: "User updated successfully" });
  } 
  catch (error) {
    res.status(500).json({ error: "Error updating user: " + error });
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByPk(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    await UserModel.update({ isActive: false, updatedAt: new Date() }, { where: { id } });

    res.json({ message: "User deleted successfully" });
  }
  catch (error) {
    res.status(500).json({ error: "Error deleting user: " + error });
  }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isPasswordValid = await compare(password, user!.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    user?.set("password", undefined, { raw: true });

    const accessToken = await generateAccessToken({ id: user!.id });
    const refreshToken = await generateRefreshToken({ id: user!.id });

    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });

    res.status(200).json({
      token: accessToken,
      data: user
    });
  } 
  catch (error) {
    res.status(500).json({ error: "Error logging in: " + error });
  }
}


export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) res.status(403).json({ error: "Refresh token not found" });

  const payload = await validateToken<{ id: string }>(refreshToken, envs.REFRESH_TOKEN_SEED);
  if (!payload) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }

  const newAccessToken = await generateAccessToken({ id: payload!.id });

  res.cookie("accessToken", newAccessToken, { httpOnly: true, secure: true });

  res.json({ accessToken: newAccessToken });
};

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logout successfull" });
};