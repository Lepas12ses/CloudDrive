import { createContext, type ReactNode } from "react";

export type ToastType = "info" | "error" | "success";

export interface ToastOptions {
	dismissTime?: number;
	type?: ToastType;
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
