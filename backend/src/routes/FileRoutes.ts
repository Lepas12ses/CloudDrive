import { Router } from "express";
import multer from "multer";
import fileController from "../controller/FileController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import { UPLOADS } from "../util/constants.js";

const fileRoutes = Router();

const upload = multer({ dest: UPLOADS });

fileRoutes.post(
	"/upload",
	authMiddleware,
	upload.single("file"),
	fileController.upload
);
fileRoutes.get("/download", authMiddleware, fileController.download);
fileRoutes.get("/", authMiddleware, fileController.getFiles);

export default fileRoutes;
