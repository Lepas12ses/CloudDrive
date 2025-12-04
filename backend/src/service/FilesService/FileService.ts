import path from "path";
import fs from "fs";
import { Op, Order } from "sequelize";

import ApiError from "#src/exceptions/ApiError.js";
import File from "#src/models/File.js";
import User from "#src/models/User.js";
import { UPLOADS_PATH } from "#src/shared/lib/consts/index.js";
import FileDto from "#src/dto/FileDto.js";
import FilesSearchParams from "./model/FilesSearchParams.js";

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
	async getFiles(userId: number, params: FilesSearchParams) {
		const user = await User.findByPk(userId);
		if (!user) {
			throw ApiError.Unauthorized();
		}

		const { page, limit, search, sort, order } = params;

		const orderValue: Order = sort && order ? [[sort, order]] : undefined;
		const searchValue = { [Op.substring]: search ?? "" };

		const { rows: files, count: total } = await File.findAndCountAll({
			where: {
				userId: user.id,
				originalName: searchValue,
			},
			order: orderValue,
			offset: (page - 1) * limit,
			limit,
		});

		const pages = Math.ceil(total / limit);

		return { files: files.map(file => new FileDto(file)), total, page, pages };
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
