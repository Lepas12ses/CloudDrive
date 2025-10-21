import type { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

const Notification: FC<PropsWithChildren> = ({ children }) => {
	const root = document.getElementById("notification");
	if (!root) return;
	return createPortal(<>{children}</>, root);
};

export default Notification;
