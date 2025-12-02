/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

export default function useDebounce(
	actionFn: (...args: any[]) => void,
	delay: number = 500
) {
	const timerRef = useRef<number>(null);

	function handleClear() {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}

	function handleSet(...args: any[]) {
		handleClear();

		timerRef.current = setTimeout(() => {
			actionFn(...args);
		}, delay);
	}

	useEffect(() => {
		return () => {
			handleClear();
		};
	}, []);

	return (...args: any[]) => {
		handleSet(...args);
	};
}
