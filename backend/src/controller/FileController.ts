import { RequestHandler } from "express";
import fileService from "../service/FileService.js";

class FileController {
	upload: RequestHandler = async (req, res, next) => {
		try {
			const userId = parseInt(req.headers.userId as string);
			const file = req.file;

			const savedFile = await fileService.saveFile(userId, file);

			res.json(savedFile);
		} catch (err) {
			next(err);
		}
	};
}

const fileController = new FileController();

export default fileController;
