import type { FC } from "react";

import type { ModalProps } from "@/shared/ui/components/Modal";
import Modal from "@/shared/ui/components/Modal";
import useUploadModal from "../../../lib/hooks/useUploadModal";
import FormProvider from "@/shared/ui/components/Form/FormProvider";
import Form from "@/shared/ui/components/Form/Form";
import FieldProvider from "@/shared/ui/components/Form/field/FieldProvider";
import Label from "@/shared/ui/components/Form/field/Label";
import FileInput from "@/shared/ui/components/Form/field/FileInput";
import FieldError from "@/shared/ui/components/Form/field/FieldError";
import Button from "@/shared/ui/components/Button";
import classes from "./UploadModal.module.scss";

const UplodaModal: FC<ModalProps> = ({ open, onClose }) => {
	const { onUpload } = useUploadModal(onClose);

	return (
		<Modal className={`${classes.modal}`} open={open} onClose={onClose}>
			<p className='font-semibold text-lg'>Выберите файлы для загрузки</p>
			<FormProvider onSubmit={onUpload}>
				<Form>
					<FieldProvider id='files'>
						<div className='flex flex-col gap-px'>
							<Label>Файлы:</Label>
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
