import { useEffect, useRef } from "react";

export default function useClickOutside<T extends HTMLElement>(
	onClick: () => void
) {
	const ref = useRef<T>(null);

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
	}, [onClick]);

	return ref;
}
