import { type ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

import useDebounce from "@/shared/lib/hooks/useDebounce";
import {
	FILES_SEARCH_PARAMS_KEYS,
	OPTIONAL_FILES_SEARCH_PARAMS_KEYS,
} from "@/shared/model/FilesSearchParams";

export default function useSearch() {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchValue =
		searchParams.get(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.SEARCH) ?? "";

	const handleSearchChange = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
		setSearchParams(prevParams => {
			const params = new URLSearchParams(prevParams);

			params.set(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.SEARCH, e.target.value);
			params.set(FILES_SEARCH_PARAMS_KEYS.PAGE, "1");

			return params;
		});
	}, 500);

	return {
		handleSearchChange,
		searchValue,
	};
}
