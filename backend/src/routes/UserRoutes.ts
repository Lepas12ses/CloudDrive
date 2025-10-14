import { Router } from "express";
import { body } from "express-validator";

import userController from "../controller/UserController.js";

const userRouter = Router();

userRouter.post("/login", userController.login);
userRouter.post(
	"/register",
	body("email").isEmail(),
	body("password").isLength({ min: 3, max: 32 }),
	userController.register
);
userRouter.post("/logout", userController.logout);
userRouter.get("/refresh", userController.refresh);

export default userRouter;
