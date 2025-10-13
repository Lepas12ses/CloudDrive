import { Router } from "express";
import userController from "../controller/UserController.js";

const userRouter = Router();

userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);
userRouter.post("/logout", userController.logout);
userRouter.get("/refresh", userController.refresh);

export default userRouter;
