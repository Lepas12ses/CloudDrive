import { Router } from "express";
import { body } from "express-validator";

import userController from "../controller/UserController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const userRouter = Router();

userRouter.post("/login", userController.login);
userRouter.post(
	"/register",
	body("login", "Длина логина должна 1 и меньше 32 символов").isLength({
		min: 1,
		max: 32,
	}),
	body("email", "Неверный email").isEmail(),
	body(
		"password",
		"Длина пароля должна быть больше 3 и меньше 32 символов"
	).isLength({
		min: 3,
		max: 32,
	}),
	userController.register
);
userRouter.post("/logout", userController.logout);
userRouter.get("/refresh", userController.refresh);
userRouter.get("/me", authMiddleware, userController.me);
userRouter.get("/hello", (req, res) => {
	res.json({ message: "Hello" });
});

export default userRouter;
