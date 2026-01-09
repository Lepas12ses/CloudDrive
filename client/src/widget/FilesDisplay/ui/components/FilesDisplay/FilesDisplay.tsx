import { type FC } from "react";

import FilesTableHeader from "../FilesTableHeader/FilesTableHeader";
import Container from "@/shared/ui/components/Container";
import classes from "./FilesDisplay.module.scss";
import PaginatedFiles from "../PaginatedFiles/PaginatedFiles";
import SkeletonField from "@/shared/ui/components/SkeletonField/SkeletonField";

const FilesDisplayComponent: FC = () => {
	return (
		<Container
			variants={{ color: "light" }}
			className={classes["files-display-wrapper"]}
		>
			<header>
				<p className='text-xl'>Мои файлы</p>
			</header>
			<FilesTableHeader />
			<PaginatedFiles />
		</Container>
	);
};

const FilesDisplaySkeleton: FC = () => {
	return (
		<Container className={classes["files-display-wrapper"]}>
			<header>
				<p className='text-xl'>
					<SkeletonField />
				</p>
			</header>
			<FilesTableHeader.Skeleton />
			<PaginatedFiles.Skeleton />
		</Container>
	);
};

type FilesDisplayType = typeof FilesDisplayComponent & {
	Skeleton: typeof FilesDisplaySkeleton;
};

const FilesDisplay = FilesDisplayComponent as FilesDisplayType;

FilesDisplay.Skeleton = FilesDisplaySkeleton;

export default FilesDisplay;
