import type { FC } from "react";

import type UserFile from "@/models/UserFile";
import convertFileSize from "@/util/convertFileSize";
import formatDate from "@/util/formatDate";
import useFileRow from "./useFileRow";
import useHover from "@/hooks/useHover";
import trashIcon from "@/assets/icons/trash.svg";
import downloadIcon from "@/assets/icons/download.svg";
import useMobile from "@/hooks/useMobile";

interface FileRowProps {
	file: UserFile;
	onDelete: () => void;
	onDownload: () => void;
}

const FileRow: FC<FileRowProps> = ({ file, onDownload, onDelete }) => {
	const { image } = useFileRow(file);
	const { ref: rowRef, isHover } = useHover<HTMLTableRowElement>();
	const isMobile = useMobile();

	return (
		<>
			<tr
				ref={rowRef}
				className='h-10 border-t border-stone-400 hover:bg-stone-300'
			>
				<td>
					<div className='flex items-center gap-2 pointer-events-none'>
						<img className='h-4' src={image.src} alt={image.alt} />
						<p>{file.name}</p>
					</div>
				</td>
				<td>
					<p className='pointer-events-none hidden md:block'>
						{formatDate(file.updatedAt)}
					</p>
				</td>
				<td>
					<p className='pointer-events-none hidden lg:block'>
						{convertFileSize(file.size)}
					</p>
				</td>
				<td>
					<div className='flex justify-end gap-3 pr-5'>
						{(isHover || isMobile) && (
							<div className='flex gap-3'>
								<button onClick={onDownload}>
									<img src={downloadIcon} alt={`Скачать ${file.name}`} />
								</button>
								<button onClick={onDelete}>
									<img src={trashIcon} alt={`Удалить ${file.name}`} />
								</button>
							</div>
						)}
					</div>
				</td>
			</tr>
		</>
	);
};

export default FileRow;
