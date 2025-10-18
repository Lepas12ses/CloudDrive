import type { FC } from "react";
import type { ModalProps } from "../Modal";
import Modal from "../Modal";
import FileInput from "../FileInput";
import Button from "../Button";
import useUploadModel from "./useUploadModel";

const UplodaModal: FC<ModalProps> = ({ open, onClose }) => {
	const { onUpload } = useUploadModel(onClose);

	return (
		<Modal
			className={`flex flex-col p-5 bg-stone-100 
                rounded-md shadow-lg border border-stone-400
				gap-3`}
			open={open}
			onClose={onClose}
		>
			<p className='font-semibold text-lg'>Выберите файлы для загрузки</p>
			<form onSubmit={onUpload} className='flex flex-col gap-2'>
				<FileInput id='files' />
				<div className='flex gap-2 justify-end'>
					<Button onClick={onClose}>Закрыть</Button>
					<Button>Отправить</Button>
				</div>
			</form>
		</Modal>
	);
};

export default UplodaModal;
