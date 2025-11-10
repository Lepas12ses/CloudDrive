import { useEffect, useState } from "react";

const mediaQuery = window.matchMedia(
	"screen and (hover: none) and (pointer: coarse)"
);

export default function useMobile() {
	const [isMobile, setIsMobile] = useState(mediaQuery.matches);

	useEffect(() => {
		function handleChange(e: MediaQueryListEvent) {
			if (e.matches) setIsMobile(true);
			else setIsMobile(false);
		}

		mediaQuery.addEventListener("change", handleChange);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	return isMobile;
}
