import type { FC } from "react";

import useFiles from "./hooks";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
import FileCard from "@/components/FileCard";
import TopFilesBar from "@/components/TopFilesBar";

const Files: FC = () => {
	const { fetching, deletion, downloading } = useFiles();

	if (fetching.isError) {
		return (
			<ErrorDisplay
				title='Возникла ошибка'
				message={fetching.error?.message || "Что-то пошло не так"}
				className='m-auto'
			/>
		);
	}

	if (fetching.isPending) {
		return <LoadingSpinner className='m-auto w-20' />;
	}

	if (fetching.data) {
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
					{!fetching.data.length && <div className='w-50'></div>}
					{fetching.data.map(file => (
						<li key={file.id}>
							<FileCard
								file={file}
								onDelete={() => deletion.proceed(file)}
								onDownload={() => downloading.proceed(file)}
							/>
						</li>
					))}
				</ul>
			</div>
		);
	}
};

export default Files;
