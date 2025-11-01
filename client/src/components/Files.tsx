import type { FC } from "react";
import TopFilesBar from "./TopFilesBar";
import FilesDisplay from "./FilesDisplay/FilesDisplay";

const Files: FC = () => {
	return (
		<div className='flex flex-col mx-auto gap-3'>
			<TopFilesBar />
			<FilesDisplay />
		</div>
	);
};

export default Files;
