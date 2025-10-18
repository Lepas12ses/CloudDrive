import type { FC } from "react";

import trashIcon from "@/assets/icons/trash.svg";
import downloadIcon from "@/assets/icons/download.svg";
import type UserFile from "@/models/UserFile";
import useFileCard from "./useFileCard";

interface FileCardProps {
	file: UserFile;
	onDelete: () => void;
	onDownload: () => void;
}

const FileCard: FC<FileCardProps> = ({ file, onDownload, onDelete }) => {
	const { id, name, image, size, updatedAt } = useFileCard(file);

	return (
		<div
			className={`bg-stone-200 border border-stone-400 w-50 
				shadow-lg rounded-md overflow-hidden relative`}
		>
			<div
				className={`w-full aspect-square flex justify-center 
				items-center`}
			>
				<img src={image.src} alt={image.alt} />
			</div>
			<div className={`bg-stone-100 rounded-t-lg p-2`}>
				<p className={`line-clamp-2 font-semibold`}>{name}</p>
				<p className='mt-2'>
					<span className='font-semibold'>Размер:</span> {size}
				</p>
				<p>
					<span className='font-semibold'>Обновлен:</span> {updatedAt}
				</p>
			</div>
			<div
				className={`absolute top-0 right-0 p-2 
				flex gap-2`}
			>
				<button onClick={onDownload}>
					<img src={downloadIcon} alt='Скачать' />
				</button>
				<button onClick={onDelete}>
					<img src={trashIcon} alt='Удалить' />
				</button>
			</div>
		</div>
	);
};

export default FileCard;
