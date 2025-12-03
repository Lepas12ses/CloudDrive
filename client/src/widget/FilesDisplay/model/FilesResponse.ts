import type { File } from "@/entity/File";

export default interface FilesResponse {
	files: File[];
	total: number;
	page: number;
	pages: number;
}
