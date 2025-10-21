import type { FC } from "react";

import useFilesGrid from "./hooks";
import ErrorDisplay from "@/components/ErrorDisplay";
import FileCard from "@/components/FileCard";
import Pages from "../Pages";

const FilesGrid: FC = () => {
	const { fetching, deletion, downloading } = useFilesGrid();

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
		return (
			<>
				<ul
					className={`w-fit gap-4 grid grid-cols-1 
					sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 m-auto`}
				>
					{new Array(fetching.cardLimit).fill(1).map((item, index) => (
						<li key={index}>
							<FileCard.Skeleton />
						</li>
					))}
				</ul>
				<Pages.Skeleton />
			</>
		);
	}

	if (fetching.data) {
		return (
			<>
				<ul
					className={`w-fit gap-4 grid grid-cols-1 
					sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 m-auto`}
				>
					{!fetching.data.files.length && <div className='w-50'></div>}
					{fetching.data.files.map(file => (
						<li key={file.id}>
							<FileCard.Card
								file={file}
								onDelete={() => deletion.proceed(file)}
								onDownload={() => downloading.proceed(file)}
							/>
						</li>
					))}
				</ul>
				<Pages.Component
					currentPage={fetching.data.page}
					totalPages={fetching.data.pages}
					linkConstructor={fetching.pageLinkConstructor}
				/>
			</>
		);
	}
};

export default FilesGrid;
