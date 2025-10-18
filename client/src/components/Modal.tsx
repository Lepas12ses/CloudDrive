import { useEffect, useRef, type FC, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export interface ModalProps extends PropsWithChildren {
	open?: boolean;
	onClose: () => void;
	className?: string;
}

const Modal: FC<ModalProps> = ({
	open = false,
	onClose,
	className = "",
	children,
}) => {
	const modalRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (open) {
			modalRef.current?.showModal();
		} else {
			modalRef.current?.close();
		}
	});

	const modalRoot = document.getElementById("modal");

	if (!modalRoot) return;

	if (!open) return;

	return createPortal(
		<dialog className={`m-auto ${className}`} ref={modalRef} onClose={onClose}>
			{children}
		</dialog>,
		modalRoot
	);
};

export default Modal;
