import { Router } from "express";
import multer from "multer";
import fileController from "../controller/FileController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const fileRoutes = Router();

const upload = multer({ dest: "uploads/" });

fileRoutes.post(
	"/upload",
	authMiddleware,
	upload.single("file"),
	fileController.upload
);

export default fileRoutes;
