import { Router } from "express";
import multer, { diskStorage } from "multer";
import fileController from "../controller/FileController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import { UPLOADS, UPLOADS_PATH } from "../util/constants.js";

const fileRoutes = Router();

const storage = diskStorage({
	destination: UPLOADS_PATH,
});
const upload = multer({ storage });

fileRoutes.post(
	"/upload",
	authMiddleware,
	upload.array("files"),
	fileController.upload
);
fileRoutes.get("/download", authMiddleware, fileController.downloadFile);
fileRoutes.delete("/delete", authMiddleware, fileController.deleteFile);
fileRoutes.get("/", authMiddleware, fileController.getFiles);

export default fileRoutes;
