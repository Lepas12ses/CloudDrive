import { useRef, type FC } from "react";

import type { File } from "@/entity/File";
import convertFileSize from "@/shared/lib/helper/convertFileSize";
import formatDate from "@/shared/lib/helper/formatDate";
import useHover from "@/shared/lib/hooks/useHover";
import trashIcon from "@/shared/assets/icons/trash.svg";
import downloadIcon from "@/shared/assets/icons/download.svg";
import useMobile from "@/shared/lib/hooks/useMobile";
import FileImage from "./FileImage";

interface FileRowProps {
	file: File;
	onDelete: () => void;
	onDownload: () => void;
}

const FileRow: FC<FileRowProps> = ({ file, onDownload, onDelete }) => {
	const rowRef = useRef<HTMLTableRowElement>(null);
	const { isHover } = useHover<HTMLTableRowElement>(rowRef);
	const isMobile = useMobile();

	return (
		<>
			<tr ref={rowRef} className='h-10 transition-colors hover:bg-(--bg-dark)'>
				<td>
					<div className='flex items-center gap-2 pointer-events-none pl-1'>
						<FileImage fileName={file.name} />
						<p>{file.name}</p>
					</div>
				</td>
				<td className='hidden md:table-cell'>
					<p className='pointer-events-none'>{formatDate(file.updatedAt)}</p>
				</td>
				<td className='hidden lg:table-cell'>
					<p className='pointer-events-none'>{convertFileSize(file.size)}</p>
				</td>
				<td>
					<div className='flex justify-end gap-3 pr-2'>
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
