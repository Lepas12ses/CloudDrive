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
			<Container variants={{ shadow: "s" }} className='flex gap-2 rounded-full'>
				<Container
					variants={{ color: "light", shadow: "is" }}
					className='flex-1 rounded-full p-0'
				>
					<SearchField
						id='search'
						className='w-full h-full'
						onChange={handleSearchChange}
						defaultValue={defaultSearch}
					/>
				</Container>

				<Button onClick={onOpenUpload} className='rounded-full'>
					Загрузить
				</Button>
			</Container>
		</>
	);
});

export default TopFilesBar;
