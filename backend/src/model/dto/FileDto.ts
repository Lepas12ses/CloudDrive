import File from "#src/model/schema/File.js";

export default class FileDto {
	id: number;
	name: string;
	size: number;
	createdAt: string;
	updatedAt: string;

	constructor(file: File) {
		this.id = file.id;
		this.name = file.originalName;
		this.size = file.size;
		this.createdAt = file.createdAt;
		this.updatedAt = file.createdAt;
	}
}
