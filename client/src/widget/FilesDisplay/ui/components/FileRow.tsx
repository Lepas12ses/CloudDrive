import type { FC } from "react";

import type { File } from "@/entity/File";
import convertFileSize from "@/shared/lib/helper/convertFileSize";
import formatDate from "@/shared/lib/helper/formatDate";
import useHover from "@/shared/lib/hooks/useHover";
import trashIcon from "@/shared/assets/icons/trash.svg";
import downloadIcon from "@/shared/assets/icons/download.svg";
import useMobile from "@/shared/lib/hooks/useMobile";
import getFileImage from "../../lib/helper/getFileImage";

interface FileRowProps {
	file: File;
	onDelete: () => void;
	onDownload: () => void;
}

const FileRow: FC<FileRowProps> = ({ file, onDownload, onDelete }) => {
	const { image } = getFileImage(file);
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
