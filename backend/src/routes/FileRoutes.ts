import { Router } from "express";
import multer, { diskStorage } from "multer";

import fileController from "#src/controller/FileController.js";
import authMiddleware from "#src/middleware/AuthMiddleware.js";
import { UPLOADS_PATH } from "#src/shared/lib/consts/paths.js";

const fileRouter = Router();

const storage = diskStorage({
	destination: UPLOADS_PATH,
});
const upload = multer({ storage });

fileRouter.post(
	"/upload",
	authMiddleware,
	upload.array("files"),
	fileController.upload
);
fileRouter.get("/download", authMiddleware, fileController.downloadFile);
fileRouter.delete("/delete", authMiddleware, fileController.deleteFile);
fileRouter.get("/", authMiddleware, fileController.getFiles);

export default fileRouter;
