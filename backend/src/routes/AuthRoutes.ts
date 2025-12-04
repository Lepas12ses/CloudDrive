import { Router } from "express";

import authController from "#src/controller/AuthController.js";

const authRouter = Router();

authRouter.post("/logout", authController.logout);
authRouter.get("/refresh", authController.refresh);

export default authRouter;
