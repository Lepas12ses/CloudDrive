import { useCallback, useEffect, useRef, useState } from "react";

export default function useHover<T extends HTMLElement>() {
	const [isHover, setIsHover] = useState(false);
	const ref = useRef<T>(null);

	const onMouseEnter = useCallback(() => {
		setIsHover(true);
	}, []);

	const onMouseLeave = useCallback(() => {
		setIsHover(false);
	}, []);

	useEffect(() => {
		const item = ref.current;

		item?.addEventListener("mouseenter", onMouseEnter);
		item?.addEventListener("mouseleave", onMouseLeave);

		return () => {
			item?.addEventListener("mouseenter", onMouseEnter);
			item?.addEventListener("mouseleave", onMouseLeave);
		};
	}, [onMouseEnter, onMouseLeave]);

	return {
		ref,
		isHover,
	};
}
