import { useRef, type FC } from "react";

import type { File } from "@/entity/File";
import convertFileSize from "@/shared/lib/helper/convertFileSize";
import formatDate from "@/shared/lib/helper/formatDate";
import useHover from "@/shared/lib/hooks/useHover";
import useMobile from "@/shared/lib/hooks/useMobile";
import FileImage from "../FileImage";
import SkeletonField from "@/shared/ui/components/SkeletonField/SkeletonField";
import DownloadIcon from "@/shared/assets/icons/download.svg?react";
import DeleteIcon from "@/shared/assets/icons/trash.svg?react";
import classes from "./FileRow.module.scss";

interface FileRowProps {
	file: File;
	onDelete: () => void;
	onDownload: () => void;
}

const FileRowComponent: FC<FileRowProps> = ({ file, onDownload, onDelete }) => {
	const rowRef = useRef<HTMLTableRowElement>(null);
	const { isHover } = useHover<HTMLTableRowElement>(rowRef);
	const isMobile = useMobile();

	return (
		<div ref={rowRef} className={classes["file-row-wrapper"]}>
			<div className='flex items-center gap-2 pointer-events-none pl-1'>
				<FileImage fileName={file.name} />
				<p>{file.name}</p>
			</div>
			<p className='pointer-events-none hidden md:block'>
				{formatDate(file.updatedAt)}
			</p>
			<p className='pointer-events-none hidden lg:block'>
				{convertFileSize(file.size)}
			</p>
			<div className='flex justify-end gap-3 pr-2'>
				{(isHover || isMobile) && (
					<div className='flex gap-3'>
						<button onClick={onDownload}>
							<DownloadIcon />
						</button>
						<button onClick={onDelete}>
							<DeleteIcon />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

const FileRowSkeleton: FC = () => {
	return <SkeletonField className={classes["row-skeleton"]} />;
};

type FileRowType = typeof FileRowComponent & {
	Skeleton: typeof FileRowSkeleton;
};
const FileRow = FileRowComponent as FileRowType;
FileRow.Skeleton = FileRowSkeleton;

export default FileRow;
