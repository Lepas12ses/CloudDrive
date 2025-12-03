/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from "react";

export default function useDebounce(
	actionFn: (...args: any[]) => void,
	delay: number = 500
) {
	const timerRef = useRef<number>(null);

	const handleClear = useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	const handleSet = useCallback(
		(...args: any[]) => {
			handleClear();

			timerRef.current = setTimeout(() => {
				actionFn(...args);
			}, delay);
		},
		[actionFn, delay, handleClear]
	);

	const resFn = useCallback(
		(...args: any[]) => {
			handleSet(...args);
		},
		[handleSet]
	);

	useEffect(() => {
		return () => {
			handleClear();
		};
	}, [handleClear]);

	return resFn;
}
