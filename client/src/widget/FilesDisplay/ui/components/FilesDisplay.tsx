import { type FC } from "react";

import useFilesDisplay from "../../lib/hooks/useFilesDisplay";
import FileRow from "./FileRow";
import FilesTableHeader from "./FilesTableHeader/FilesTableHeader";
import Pages from "./Pages/Pages";
import Container from "@/shared/ui/components/Container";
import FilesDisplaySkeleton from "./FilesDisplaySkeleton";

const FilesDisplayComponent: FC = () => {
	const { fetching, deletion, downloading } = useFilesDisplay();
	return (
		<>
			<Container variants={{ color: "light" }} className='rounded-md'>
				<section>
					<header>
						<p className='text-xl'>Мои файлы</p>
					</header>
					{fetching.data && (
						<div className='flex flex-col gap-1.5'>
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

type FilesDisplayType = typeof FilesDisplayComponent & {
	Skeleton: typeof FilesDisplaySkeleton;
};

const FilesDisplay = FilesDisplayComponent as FilesDisplayType;

FilesDisplay.Skeleton = FilesDisplaySkeleton;

export default FilesDisplay;
