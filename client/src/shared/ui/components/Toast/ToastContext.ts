import { createContext, type ReactNode } from "react";

export interface ToastOptions {
	dismissTime?: number;
}

export interface IToastContext {
	open: (component: ReactNode, options?: ToastOptions) => string;
	close: (toastId: string) => void;
}

const InitialToastContext: IToastContext = {
	open: () => "",
	close: () => {},
};

export const ToastContext = createContext(InitialToastContext);
