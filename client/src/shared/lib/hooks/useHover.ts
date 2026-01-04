import { useEffect, useState, type RefObject } from "react";
import useMobile from "./useMobile";

export default function useHover<T extends HTMLElement>(
	ref: RefObject<T | null>
) {
	const [isHover, setIsHover] = useState(false);
	const isMobile = useMobile();

	useEffect(() => {
		if (isMobile) {
			setIsHover(false);
		} else {
			function onMouseEnter() {
				setIsHover(true);
			}

			function onMouseLeave() {
				setIsHover(false);
			}

			const item = ref.current;

			item?.addEventListener("mouseenter", onMouseEnter);
			item?.addEventListener("mouseleave", onMouseLeave);

			return () => {
				item?.removeEventListener("mouseenter", onMouseEnter);
				item?.removeEventListener("mouseleave", onMouseLeave);
			};
		}
	}, [isMobile, ref]);

	return {
		isHover,
	};
}
