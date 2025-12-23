import type { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

const ToastPortal: FC<PropsWithChildren> = ({ children }) => {
	const root = document.getElementById("toast");
	if (!root) return;
	return createPortal(children, root);
};

export default ToastPortal;
