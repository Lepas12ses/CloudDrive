import path from "path";
import fs from "fs";

import FileDto from "../dto/FileDto.js";
import ApiError from "../exceptions/ApiError.js";
import File from "../models/File.js";
import User from "../models/User.js";
import { UPLOADS_PATH } from "../util/constants.js";
import { Op } from "sequelize";

class FileService {
	async saveFile(userId: number, file: Express.Multer.File) {
		const user = await User.findByPk(userId);

		if (!user) {
			throw ApiError.Unauthorized();
		}

		if (!file) {
			throw ApiError.BadRequest("Где файлы??");
		}

		const savedFile = await File.create({
			originalName: file.originalname,
			name: file.filename,
			size: file.size,
			userId: user.id,
		});

		return new FileDto(savedFile);
	}
	async saveFiles(userId: number, files: Express.Multer.File[]) {
		const user = await User.findByPk(userId);

		if (!user) {
			throw ApiError.Unauthorized();
		}

		if (files.length === 0) {
			throw ApiError.BadRequest("Где файлы??");
		}

		const savedFiles = await File.bulkCreate(
			files.map(file => ({
				originalName: Buffer.from(file.originalname, "latin1").toString(),
				name: file.filename,
				size: file.size,
				userId: user.id,
			}))
		);

		return savedFiles.map(file => new FileDto(file));
	}

	async downloadFile(fileId: number, userId: number) {
		const user = await User.findByPk(userId);

		if (!user) {
			throw ApiError.Unauthorized();
		}

		const file = await File.findOne({ where: { id: fileId, userId: user.id } });

		if (!file) {
			throw ApiError.BadRequest("Файла не существует");
		}

		const originalName = file.originalName;
		const filePath = path.join(UPLOADS_PATH, file.name);

		return {
			originalName,
			filePath,
		};
	}
	async getFiles(
		userId: number,
		params: {
			page: number;
			limit: number;
			search: string;
		}
	) {
		const { page, limit, search } = params;
		const user = await User.findByPk(userId);

		if (!user) {
			throw ApiError.Unauthorized();
		}

		const files = await File.findAll({
			where: {
				userId: user.id,
				originalName: {
					[Op.substring]: search,
				},
			},
			offset: (page - 1) * limit,
			limit,
		});

		return files.map(file => new FileDto(file));
	}
	async removeFile(fileId: number, userId: number) {
		const user = await User.findByPk(userId);

		if (!user) {
			throw ApiError.Unauthorized();
		}

		const file = await File.findOne({ where: { id: fileId, userId: user.id } });

		if (!file) {
			return;
		}

		const filePath = path.join(UPLOADS_PATH, file.name);
		fs.unlinkSync(filePath);
		await file.destroy();
	}
}

const fileService = new FileService();

export default fileService;
