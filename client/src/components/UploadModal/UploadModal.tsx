import type { FC } from "react";
import type { ModalProps } from "../shared/Modal";
import Modal from "../shared/Modal";

import useUploadModel from "./useUploadModel";
import FormProvider from "../shared/Form/FormProvider";
import Form from "../shared/Form/Form";
import FieldProvider from "../shared/Form/field/FieldProvider";
import Label from "../shared/Form/field/Label";
import FileInput from "../shared/Form/field/FileInput";
import FieldError from "../shared/Form/field/FieldError";
import Button from "../shared/Button";

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
			<FormProvider onSubmit={onUpload}>
				<Form>
					<FieldProvider id='files'>
						<div className='flex flex-col gap-0.25'>
							<Label>Файлы</Label>
							<FileInput multiple />
							<FieldError />
						</div>
					</FieldProvider>
					<div className='flex gap-2 mt-3 justify-end'>
						<Button
							variants={{ color: "primary", style: "outline" }}
							onClick={onClose}
						>
							Закрыть
						</Button>
						<Button>Отправить</Button>
					</div>
				</Form>
			</FormProvider>
		</Modal>
	);
};

export default UplodaModal;
