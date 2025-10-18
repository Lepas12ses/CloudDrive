import type { FC } from "react";

import useFiles from "./useFiles";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
import FileCard from "@/components/FileCard";
import TopFilesBar from "@/components/TopFilesBar";

const Files: FC = () => {
	const { data, isError, error, isPending, onDownloadFile, onDeleteFile } =
		useFiles();
	if (isError) {
		return (
			<ErrorDisplay
				title='Возникла ошибка'
				message={error?.message || "Что-то пошло не так"}
				className='m-auto'
			/>
		);
	}

	if (isPending) {
		return <LoadingSpinner className='m-auto w-20' />;
	}

	if (data) {
		return (
			<div
				className={`mx-auto w-fit flex flex-col
			gap-3`}
			>
				<TopFilesBar />
				<ul
					className={`w-fit gap-4 grid grid-cols-1 
					sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}
				>
					{data.map(file => (
						<li key={file.id}>
							<FileCard
								file={file}
								onDelete={() => onDeleteFile(file)}
								onDownload={() => onDownloadFile(file)}
							/>
						</li>
					))}
				</ul>
			</div>
		);
	}
};

export default Files;
