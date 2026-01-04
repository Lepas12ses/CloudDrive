import { useEffect, type RefObject } from "react";

export default function useClickOutside<T extends HTMLElement>(
	ref: RefObject<T | null>,
	onClick: () => void
) {
	useEffect(() => {
		if (ref.current) {
			const target = ref.current;

			function handleClick(event: PointerEvent) {
				if (!target.contains(event.target as Node)) {
					onClick();
				}
			}

			document.addEventListener("click", handleClick);

			return () => {
				document.removeEventListener("click", handleClick);
			};
		}
	}, [onClick, ref]);
}
