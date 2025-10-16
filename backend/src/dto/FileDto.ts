import File from "../models/File.js";

export default class FileDto {
	id: number;
	name: string;
	size: number;

	constructor(file: File) {
		this.id = file.id;
		this.name = file.originalName;
		this.size = file.size;
	}
}
