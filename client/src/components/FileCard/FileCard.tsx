import type { FC } from "react";

import trashIcon from "@/assets/icons/trash.svg";
import downloadIcon from "@/assets/icons/download.svg";
import type UserFile from "@/models/UserFile";
import useFileCard from "./useFileCard";
import Container from "../Container";

interface FileCardProps {
	file: UserFile;
	onDelete: () => void;
	onDownload: () => void;
}

const FileCard: FC<FileCardProps> = ({ file, onDownload, onDelete }) => {
	const { name, image, size, updatedAt } = useFileCard(file);
	return (
		<Container
			variants={{ shadow: "l" }}
			className='w-50 p-0 rounded-xl overflow-hidden h-full relative'
		>
			<div
				className={`w-full aspect-square flex justify-center 
				items-center`}
			>
				<img src={image.src} alt={image.alt} />
			</div>
			<Container
				variants={{ color: "light", padding: "s" }}
				className='rounded-t-lg h-full'
			>
				<p className={`line-clamp-2 font-semibold`}>{name}</p>
				<p className='mt-2'>
					<span className='font-semibold'>Размер:</span> {size}
				</p>
				<p>
					<span className='font-semibold'>Обновлен:</span> {updatedAt}
				</p>
			</Container>
			<Container
				variants={{ color: "light", shadow: "s" }}
				className={`absolute top-1 right-1 p-0 
				flex rounded-full divide-x-2 divide-dotted 
				divide-(--bg-dark) overflow-hidden`}
			>
				<button className='py-2 px-3 hover:bg-(--bg-dark)' onClick={onDownload}>
					<img src={downloadIcon} alt='Скачать' />
				</button>
				<button className='py-2 px-3 hover:bg-(--bg-dark)' onClick={onDelete}>
					<img src={trashIcon} alt='Удалить' />
				</button>
			</Container>
		</Container>
	);
};

export default FileCard;
