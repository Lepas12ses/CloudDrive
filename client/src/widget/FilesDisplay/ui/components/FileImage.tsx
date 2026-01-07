import type { FC } from "react";

import ImageFile from "@/shared/assets/icons/image-file.svg?react";
import TextFile from "@/shared/assets/icons/text-file.svg?react";
import CodeFile from "@/shared/assets/icons/code-file.svg?react";
import UnknownFile from "@/shared/assets/icons/file.svg?react";
import getFileType from "@/shared/lib/helper/getFileType";

interface FileImageProps {
	fileName: string;
}

const FileImage: FC<FileImageProps> = ({ fileName }) => {
	const fileType = getFileType(fileName);

	let Comp = UnknownFile;

	switch (fileType) {
		case "image":
			Comp = ImageFile;
			break;
		case "text":
			Comp = TextFile;
			break;
		case "code":
			Comp = CodeFile;
			break;
	}

	return <Comp className='h-4 text-(--text)' />;
};

export default FileImage;
