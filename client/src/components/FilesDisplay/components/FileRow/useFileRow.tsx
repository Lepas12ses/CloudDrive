import getFileType from "@/shared/lib/helper/getFileType";
import imageFileIcon from "@/shared/assets/icons/image-file.svg";
import textFileIcon from "@/shared/assets/icons/text-file.svg";
import codeFileIcon from "@/shared/assets/icons/code-file.svg";
import fileIcon from "@/shared/assets/icons/file.svg";
import type UserFile from "@/models/UserFile";

export default function useFileRow(file: UserFile) {
	const { name } = file;

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
		image: {
			src: image,
			alt,
		},
	};
}
