import type { FC } from "react";
import useFiles from "./useFiles";
import LoadingSpinner from "../LoadingSpinner";
import ErrorDisplay from "../ErrorDisplay";
import FileCard from "../FileCard";

const Files: FC = () => {
	const { data, isError, error, isPending } = useFiles();

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
			<ul
				className={`w-fit gap-4 grid grid-cols-1 
					sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
					mx-auto`}
			>
				{data.map(file => (
					<li key={file.id}>
						<FileCard file={file} />
					</li>
				))}
			</ul>
		);
	}
};

export default Files;
