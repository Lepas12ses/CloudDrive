import imageFileIcon from "@/assets/icons/image-file.svg";
import textFileIcon from "@/assets/icons/text-file.svg";
import codeFileIcon from "@/assets/icons/code-file.svg";
import fileIcon from "@/assets/icons/file.svg";
import type UserFile from "@/models/UserFile";
import getFileType from "@/util/getFileType";
import convertFileSize from "@/util/convertFileSize";
import formatDate from "@/util/formatDate";

export default function useFileCard(file: UserFile) {
	const { id, name, size, createdAt, updatedAt } = file;

	const fileType = getFileType(name);
	let image: string;
	let alt: string;
	switch (fileType) {
		case "image": {
			image = imageFileIcon;
			alt = "Файл с картинкой";
			break;
		}
		case "text": {
			image = textFileIcon;
			alt = "Файл с текстом";
			break;
		}
		case "code": {
			image = codeFileIcon;
			alt = "Файл с кодом";
			break;
		}
		case "unknown": {
			image = fileIcon;
			alt = "Файл";
			break;
		}
	}

	return {
		id,
		name,
		image: {
			src: image,
			alt: alt,
		},
		size: convertFileSize(size),
		createdAt: formatDate(createdAt),
		updatedAt: formatDate(updatedAt),
	};
}
