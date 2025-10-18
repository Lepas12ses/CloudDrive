import type { FC } from "react";
import Button from "@/components/Button";
import useTopFilesBar from "./useTopFilesBar";
import UplodaModal from "../UploadModal";

const TopFilesBar: FC = () => {
	const { isUploading, onCloseUploading, onOpenUpload } = useTopFilesBar();

	return (
		<>
			<UplodaModal open={isUploading} onClose={onCloseUploading} />
			<div className='flex'>
				<Button onClick={onOpenUpload}>Загрузить</Button>
			</div>
		</>
	);
};

export default TopFilesBar;
