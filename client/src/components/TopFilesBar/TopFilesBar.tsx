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
				<Container
					variants={{ color: "light", shadow: "s" }}
					className='px-1 py-0.5 w-50 relative rounded-full flex items-center'
				>
					<SelectProvider
						onChange={option => {
							onSortChange(option);
						}}
						getSelectedOptionContent={value => SORT_OPTIONS.get(value) ?? ""}
					>
						<SelectedOption fallbackText='Ничего не выбрано' />
						<Options>
							<Container
								variants={{ color: "light", shadow: "l" }}
								className='absolute z-10 top-full w-full flex flex-col mt-2 rounded-md'
							>
								{Array.from(SORT_OPTIONS.entries()).map(entry => (
									<Option key={entry[0]} value={entry[0]}>
										{entry[1]}
									</Option>
								))}
							</Container>
						</Options>
					</SelectProvider>
				</Container>
			</Container>
		</>
	);
});

export default TopFilesBar;
