import path from "path";
import FileDto from "../dto/FileDto.js";
import ApiError from "../exceptions/ApiError.js";
import File from "../models/File.js";
import User from "../models/User.js";
import { UPLOADS_PATH } from "../util/constants.js";

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

	async downloadFile(fileId: number, userId: number) {
		const user = await User.findByPk(userId);

		if (!user) {
			throw ApiError.Unauthorized();
		}

		const file = await File.findOne({ where: { id: fileId, userId: user.id } });

		const originalName = file.originalName;
		const filePath = path.join(UPLOADS_PATH, file.name);

		return {
			originalName,
			filePath,
		};
	}
	async getFiles(userId: number) {
		const user = await User.findByPk(userId);

		if (!user) {
			throw ApiError.Unauthorized();
		}

		const files = await File.findAll({ where: { userId: user.id } });

		return files.map(file => new FileDto(file));
	}
}

const fileService = new FileService();

export default fileService;
