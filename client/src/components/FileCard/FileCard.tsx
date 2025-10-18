import type { FC } from "react";

import type UserFile from "@/models/UserFile";
import useFileCard from "./useFileCard";

interface FileCardProps {
	file: UserFile;
}

const FileCard: FC<FileCardProps> = ({ file }) => {
	const { id, name, image, size, updatedAt } = useFileCard(file);

	return (
		<div
			className={`bg-stone-200 border border-stone-400 w-50 
				shadow-lg rounded-md overflow-hidden`}
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
		</div>
	);
};

export default FileCard;
