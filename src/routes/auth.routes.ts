import { Router } from "express";
import { getUsers, getUserById, loginUser, logoutUser, refreshToken, registerUser, updateUser, deleteUser } from "../controllers/auth.controller";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
  
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/refresh-token", refreshToken);
userRouter.post("/logout", logoutUser);

userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export { userRouter };

