import {
	useEffect,
	useState,
	type FC,
	type PropsWithChildren,
	type ReactNode,
} from "react";
import { useSearchParams } from "react-router-dom";

import Arrow from "@/shared/assets/icons/circle-arrow.svg?react";
import { OPTIONAL_FILES_SEARCH_PARAMS_KEYS } from "@/shared/model/FilesSearchParams";

interface HeaderSortProps extends PropsWithChildren {
	sortField: string;
	className?: string;
}

const HeaderSort: FC<HeaderSortProps> = ({
	children,
	sortField,
	className = "",
}) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [order, setOrder] = useState<"asc" | "desc" | null>(null);

	useEffect(() => {
		const sort = searchParams.get(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.SORT);
		const order = searchParams.get(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.ORDER);

		if (sort === sortField && (order === "asc" || order === "desc")) {
			setOrder(order);
		} else {
			setOrder(null);
		}
	}, [searchParams, sortField]);

	function handleClick() {
		switch (order) {
			case "asc":
				setSearchParams(prevParams => {
					const params = new URLSearchParams(prevParams);

					params.set(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.ORDER, "desc");
					return params;
				});
				break;
			case "desc":
				setSearchParams(prevParams => {
					const params = new URLSearchParams(prevParams);

					params.set(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.ORDER, "asc");
					return params;
				});
				break;
			default:
				setSearchParams(prevParams => {
					const params = new URLSearchParams(prevParams);

					params.set(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.SORT, sortField);
					params.set(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.ORDER, "asc");
					return params;
				});
				break;
		}
	}

	let icon: ReactNode | null = null;

	switch (order) {
		case "asc":
			icon = <Arrow />;
			break;
		case "desc":
			icon = <Arrow className='rotate-180' />;
			break;
	}

	return (
		<button
			onClick={handleClick}
			className={`flex gap-1 
						items-center rounded-md 
						hover:bg-(--bg-dark) transition-colors
						font-semibold
						${className}`}
		>
			{children}
			{icon}
		</button>
	);
};

export default HeaderSort;
