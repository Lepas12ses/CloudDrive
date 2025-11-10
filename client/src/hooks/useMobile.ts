import { useEffect, useState } from "react";

export default function useMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(
			"screen and (hover: none) and (pointer: coarse)"
		);

		function handleChange(e: MediaQueryListEvent) {
			if (e.matches) setIsMobile(true);
			else setIsMobile(false);
		}

		mediaQuery.addEventListener("change", handleChange);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	});

	return isMobile;
}
