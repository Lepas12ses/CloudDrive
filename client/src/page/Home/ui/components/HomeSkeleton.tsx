import { FilesDisplay } from "@/widget/FilesDisplay";
import { TopFilesBar } from "@/widget/TopFilesBar";
import type { FC } from "react";

const HomeSkeleton: FC = () => {
	return (
		<div className='flex flex-col gap-3'>
			<TopFilesBar.Skeleton />
			<FilesDisplay.Skeleton />
		</div>
	);
};

export default HomeSkeleton;
