import type { FC } from "react";
import useFiles from "./useFiles";
import LoadingSpinner from "../LoadingSpinner";
import ErrorDisplay from "../ErrorDisplay";
import convertFileSize from "@/util/convertFileSize";

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
			<ul>
				{data.map(file => (
					<li key={file.id}>
						<p>{`Имя файла: ${file.name}`}</p>
						<p>{`Размер файла: ${convertFileSize(file.size)}`}</p>
					</li>
				))}
			</ul>
		);
	}
};

export default Files;
