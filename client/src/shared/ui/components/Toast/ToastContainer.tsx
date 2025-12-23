import type { FC, PropsWithChildren } from "react";
import type { ToastType } from "./ToastContext";
import Container from "../Container";

interface ToastContainerProps extends PropsWithChildren {
	toastType?: ToastType;
}

const ToastContainer: FC<ToastContainerProps> = ({ toastType, children }) => {
	let toastColor = "";
	let textColor = "";

	switch (toastType) {
		case "info":
			toastColor = "bg-blue-200";
			textColor = "text-blue-900";
			break;
		case "error":
			toastColor = "bg-red-200";
			textColor = "text-red-900";
			break;
		case "success":
			toastColor = "bg-green-200";
			textColor = "text-green-900";
			break;
	}

	return (
		<Container
			variants={{ shadow: "m" }}
			className={`rounded-md ${toastColor} ${textColor}`}
		>
			{children}
		</Container>
	);
};

export default ToastContainer;
