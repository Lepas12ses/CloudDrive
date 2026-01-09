import type { FC } from "react";

import FileRow from "../FileRow/FileRow";
import Pages from "../Pages/Pages";
import useFetchFiles from "@/widget/FilesDisplay/lib/hooks/useFetchFiles";
import useDownload from "@/widget/FilesDisplay/lib/hooks/useDownload";
import repeat from "@/shared/lib/helper/repeat";
import classes from "./PaginatedFiles.module.scss";
import useDelete from "@/widget/FilesDisplay/lib/hooks/useDelete";

const PaginatedFilesComponent: FC = () => {
	const files = useFetchFiles();
	const deletion = useDelete(files.onFileDelete);
	const downloading = useDownload();

	if (files.data)
		return (
			<div className={classes["files-pages-wrapper"]}>
				<div className={classes["files"]}>
					{files.data.files.map(file => (
						<FileRow
							key={file.id}
							file={file}
							onDownload={() => downloading.proceed(file)}
							onDelete={() => deletion.proceed(file)}
						/>
					))}
				</div>
				<Pages
					currentPage={files.data.page}
					totalPages={files.data.pages}
					linkConstructor={files.pageLinkConstructor}
				/>
			</div>
		);

	return <PaginatedFilesSkeleton />;
};

const PaginatedFilesSkeleton: FC = () => {
	return (
		<div className={classes["files-pages-wrapper"]}>
			<div className={`${classes["files"]} ${classes["files_skeleton"]}`}>
				{repeat(10, i => (
					<FileRow.Skeleton key={i} />
				))}
			</div>
			<Pages.Skeleton />
		</div>
	);
};

type PaginatedFilesType = typeof PaginatedFilesComponent & {
	Skeleton: typeof PaginatedFilesSkeleton;
};
const PaginatedFiles = PaginatedFilesComponent as PaginatedFilesType;

PaginatedFiles.Skeleton = PaginatedFilesSkeleton;

export default PaginatedFiles;
