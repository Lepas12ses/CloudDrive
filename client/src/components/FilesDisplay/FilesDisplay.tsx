import type { FC } from "react";
import Container from "../shared/Container";
import useFilesDisplay from "./hooks";
import FileRow from "./components/FileRow";
import FilesTableHeader from "./components/FilesTableHeader";
import Pages from "../Pages";
import LoadingNotification from "./components/LoadingNotification";

const FilesDisplay: FC = () => {
	const { fetching, deletion, downloading } = useFilesDisplay();
	return (
		<>
			{deletion.isPending && (
				<LoadingNotification>Удаляем файл</LoadingNotification>
			)}
			{downloading.isPending && (
				<LoadingNotification>Загружаем файл</LoadingNotification>
			)}
			<Container variants={{ color: "light" }} className='rounded-md'>
				<section>
					<header>
						<p className='text-xl'>Мои файлы</p>
					</header>
					{fetching.data && (
						<div>
							<table className='w-full'>
								<FilesTableHeader />
								<tbody>
									{fetching.data.files.map(file => (
										<FileRow
											key={file.id}
											file={file}
											onDownload={() => downloading.proceed(file)}
											onDelete={() => deletion.proceed(file)}
										/>
									))}
								</tbody>
							</table>
							<Pages.Component
								currentPage={fetching.data.page}
								totalPages={fetching.data.pages}
								linkConstructor={fetching.pageLinkConstructor}
							/>
						</div>
					)}
				</section>
			</Container>
		</>
	);
};

export default FilesDisplay;
