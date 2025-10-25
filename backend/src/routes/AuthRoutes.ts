import { Router } from "express";

import authController from "../controller/AuthController.js";

const authRouter = Router();

authRouter.post("/logout", authController.logout);
authRouter.get("/refresh", authController.refresh);

export default authRouter;
