import {
	useEffect,
	useState,
	type FC,
	type PropsWithChildren,
	type ReactNode,
} from "react";
import { useSearchParams } from "react-router-dom";

import arrowIcon from "@/shared/assets/icons/circle-arrow.svg";
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
			icon = <img src={arrowIcon} alt='Стрелочка направленная вверх' />;
			break;
		case "desc":
			icon = (
				<img
					className='rotate-180'
					src={arrowIcon}
					alt='Стрелочка направленная вниз'
				/>
			);
			break;
	}

	return (
		<th className={className}>
			<button
				onClick={handleClick}
				className={`px-2 h-12 w-full flex gap-1 
							items-center rounded-md hover:bg-stone-300`}
			>
				{children}
				{icon}
			</button>
		</th>
	);
};

export default HeaderSort;
