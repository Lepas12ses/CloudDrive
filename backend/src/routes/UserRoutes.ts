import { Router } from "express";
import { body } from "express-validator";

import userController from "../controller/UserController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

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
userRouter.get("/hello", authMiddleware, (req, res) => {
	res.json({ message: `Hello user with id ${req.headers.userId}` });
});

export default userRouter;
