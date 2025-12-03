import { memo, type FC } from "react";

import Button from "@/shared/ui/components/Button";
import useTopFilesBar from "../../lib/hooks/useTopFilesBar";
import UplodaModal from "./UploadModal";
import SearchField from "./SearchField";
import Container from "@/shared/ui/components/Container";

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
			<Container
				variants={{ shadow: "s" }}
				className='flex items-center justify-between gap-2 rounded-md'
			>
				<SearchField
					id='search'
					className='w-full h-full'
					onChange={handleSearchChange}
					defaultValue={defaultSearch}
				/>

				<Button onClick={onOpenUpload} className='rounded-full'>
					Загрузить
				</Button>
			</Container>
		</>
	);
});

export default TopFilesBar;
