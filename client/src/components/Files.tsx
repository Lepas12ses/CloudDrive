import type { FC } from "react";
import TopFilesBar from "./TopFilesBar";
import FilesGrid from "./FilesGrid";

const Files: FC = () => {
	return (
		<div className='flex flex-col w-fit mx-auto gap-3'>
			<TopFilesBar />
			<FilesGrid />
		</div>
	);
};

export default Files;
