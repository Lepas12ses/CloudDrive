import { useEffect, useState } from "react";

export default function useBreakpoint(
	left: number | null,
	right: number | null
) {
	const [isMatches, setIsMatches] = useState(false);

	let query = "";

	if (left !== null && right !== null) {
		query = `(min-width: ${left / 16}rem) and (max-width: ${right})`;
	} else if (left !== null && right === null) {
		query = `(min-width: ${left / 16}rem)`;
	} else if (left === null && right !== null) {
		query = `(max-width: ${right / 16}rem)`;
	}

	const mediaQuery = window.matchMedia(query);

	useEffect(() => {
		if (query) {
			function handleChange(e: MediaQueryListEvent) {
				if (e.matches) setIsMatches(true);
				else setIsMatches(false);
			}

			mediaQuery.addEventListener("change", handleChange);

			return () => {
				mediaQuery.removeEventListener("change", handleChange);
			};
		}
	}, [mediaQuery, query]);

	return isMatches;
}
