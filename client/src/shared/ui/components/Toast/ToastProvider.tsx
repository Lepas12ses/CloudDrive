import {
	useCallback,
	useState,
	type FC,
	type PropsWithChildren,
	type ReactNode,
} from "react";
import {
	ToastContext,
	type IToastContext,
	type ToastOptions,
} from "./ToastContext";
import { v4 } from "uuid";
import ToastPortal from "./ToastPortal";

const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
	const [toasts, setToasts] = useState<
		Array<{
			id: string;
			component: ReactNode;
		}>
	>([]);

	const close = useCallback((id: string) => {
		setToasts(prev => prev.filter(toast => toast.id !== id));
	}, []);

	const open = useCallback(
		(component: ReactNode, options?: ToastOptions) => {
			const id = v4();

			setToasts(prev => [...prev, { id, component }]);

			if (options) {
				if (options.dismissTime) {
					setTimeout(() => close(id), options.dismissTime);
				}
			}

			return id;
		},
		[close]
	);

	const ctxValue: IToastContext = { open, close };

	return (
		<>
			<ToastPortal>
				<div className='fixed bottom-10 right-10 flex flex-col gap-1 z-10'>
					{toasts.map(toast => (
						// Change to toast container
						<div key={toast.id}>{toast.component}</div>
					))}
				</div>
			</ToastPortal>
			<ToastContext.Provider value={ctxValue}>{children}</ToastContext.Provider>
		</>
	);
};

export default ToastProvider;
