import type UserFile from "./UserFile";

export default interface FilesResponse {
	files: UserFile[];
	total: number;
	page: number;
	pages: number;
}
