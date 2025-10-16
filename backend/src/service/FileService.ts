import FileDto from "../dto/FileDto.js";
import ApiError from "../exceptions/ApiError.js";
import File from "../models/File.js";
import User from "../models/User.js";

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
}

const fileService = new FileService();

export default fileService;
