import { RequestHandler } from "express";
import fileService from "../service/FileService.js";
import ApiError from "../exceptions/ApiError.js";

class FileController {
	upload: RequestHandler = async (req, res, next) => {
		try {
			const userId = parseInt(req.headers.userId as string);
			const files = req.files as Express.Multer.File[];

			const savedFiles = await fileService.saveFiles(userId, files);

			res.json(savedFiles);
		} catch (err) {
			next(err);
		}
	};
	downloadFile: RequestHandler = async (req, res, next) => {
		try {
			const userId = parseInt(req.headers.userId as string);

			const fileIdParam = req.query.fileId;
			let fileId: number;
			if (typeof fileIdParam === "string") fileId = parseInt(fileIdParam);
			else {
				next(ApiError.BadRequest("Неверный идентификатор файла"));
			}

			const file = await fileService.downloadFile(fileId, userId);

			res.download(file.filePath, file.originalName);
		} catch (err) {
			next(err);
		}
	};
	deleteFile: RequestHandler = async (req, res, next) => {
		try {
			const userId = parseInt(req.headers.userId as string);

			const fileIdParam = req.query.fileId;
			let fileId: number;
			if (typeof fileIdParam === "string") fileId = parseInt(fileIdParam);
			else {
				next(ApiError.BadRequest("Неверный идентификатор файла"));
			}

			await fileService.removeFile(fileId, userId);

			res.status(200).end();
		} catch (err) {
			next(err);
		}
	};
	getFiles: RequestHandler = async (req, res, next) => {
		try {
			const userId = parseInt(req.headers.userId as string);

			const files = await fileService.getFiles(userId);

			res.json(files);
		} catch (err) {
			next(err);
		}
	};
}

const fileController = new FileController();

export default fileController;
