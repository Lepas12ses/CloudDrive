import { memo, type FC } from "react";
import Button from "@/components/Button";
import useTopFilesBar from "./useTopFilesBar";
import UplodaModal from "../UploadModal";
import SearchField from "../SearchField";

const TopFilesBar: FC = memo(() => {
	const {
		isUploading,
		onCloseUploading,
		onOpenUpload,
		handleSearchChange,
		defaultSearch,
	} = useTopFilesBar();

	return (
		<>
			<UplodaModal open={isUploading} onClose={onCloseUploading} />
			<div className='flex gap-2'>
				<SearchField
					id='search'
					className='flex-1'
					onChange={handleSearchChange}
					defaultValue={defaultSearch}
				/>
				<Button className='h-full' onClick={onOpenUpload}>
					Загрузить
				</Button>
			</div>
		</>
	);
});

export default TopFilesBar;
