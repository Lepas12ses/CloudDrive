import type { FC } from "react";

import HeaderSort from "./HeaderSort";
import SortDropDown from "../SortDropDown/SortDropDown";
import classes from "./FilesTableHeader.module.scss";
import SkeletonField from "@/shared/ui/components/SkeletonField/SkeletonField";
import repeat from "@/shared/lib/helper/repeat";

const FilesTableHeaderComponent: FC = () => {
	return (
		<div className={classes["header-wrapper"]}>
			<HeaderSort sortField='name'>Название</HeaderSort>
			<HeaderSort sortField='date' className='hidden md:flex'>
				Дата изменения
			</HeaderSort>
			<HeaderSort sortField='size' className='hidden lg:flex'>
				Размер файла
			</HeaderSort>
			<SortDropDown />
		</div>
	);
};

const FilesTableHeaderSkeleton: FC = () => {
	return (
		<div className={classes["header-wrapper"]}>
			{repeat(4, i => (
				<SkeletonField key={i} />
			))}
		</div>
	);
};

type FilesTableHeaderType = typeof FilesTableHeaderComponent & {
	Skeleton: typeof FilesTableHeaderSkeleton;
};
const FilesTableHeader = FilesTableHeaderComponent as FilesTableHeaderType;
FilesTableHeader.Skeleton = FilesTableHeaderSkeleton;

export default FilesTableHeader;
