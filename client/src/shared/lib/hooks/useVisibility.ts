import { useCallback, useState } from "react";

export default function useVisibility(initial: boolean = false) {
	const [isVisible, setIsVisible] = useState(initial);

	const show = useCallback(() => {
		setIsVisible(true);
	}, []);

	const hide = useCallback(() => {
		setIsVisible(false);
	}, []);

	const toggle = useCallback(() => {
		setIsVisible(prev => !prev);
	}, []);

	return {
		isVisible,
		show,
		hide,
		toggle,
	};
}
