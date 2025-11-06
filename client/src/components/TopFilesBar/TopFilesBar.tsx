import { memo, type FC } from "react";
import Button from "@/components/shared/Button";
import useTopFilesBar, { SORT_OPTIONS } from "./useTopFilesBar";
import UplodaModal from "../UploadModal";
import SearchField from "../SearchField";
import Container from "../shared/Container";
import SelectedOption from "../shared/Select/SelectedOption";
import SelectProvider from "../shared/Select/SelectProvider";
import Options from "../shared/Select/Options";
import Option from "../shared/Select/Option";

const TopFilesBar: FC = memo(() => {
	const {
		isUploading,
		onCloseUploading,
		onOpenUpload,
		handleSearchChange,
		defaultSearch,
		onSortChange,
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
