import { RequestHandler } from "express";
import fileService from "#src/service/FilesService/FileService.js";
import ApiError from "#src/exceptions/ApiError.js";
import FilesSearchParams from "#src/service/FilesService/model/FilesSearchParams.js";

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

			if (typeof fileIdParam !== "string")
				return next(ApiError.BadRequest("Неверный идентификатор файла"));

			const fileId = parseInt(fileIdParam);

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

			if (typeof fileIdParam !== "string")
				return next(ApiError.BadRequest("Неверный идентификатор файла"));

			const fileId = parseInt(fileIdParam);

			await fileService.removeFile(fileId, userId);

			res.status(200).end();
		} catch (err) {
			next(err);
		}
	};
	getFiles: RequestHandler = async (req, res, next) => {
		try {
			const { page, limit, search, sort, order } = req.query;

			const searchParams = new FilesSearchParams(
				limit,
				page,
				search,
				sort,
				order
			);

			const userId = parseInt(req.headers.userId as string);

			const files = await fileService.getFiles(userId, searchParams);

			res.json(files);
		} catch (err) {
			next(err);
		}
	};
}

const fileController = new FileController();

export default fileController;
