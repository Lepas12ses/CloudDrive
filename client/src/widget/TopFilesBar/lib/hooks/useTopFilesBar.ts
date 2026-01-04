import {
	FILES_SEARCH_PARAMS_KEYS,
	OPTIONAL_FILES_SEARCH_PARAMS_KEYS,
} from "@/shared/model/FilesSearchParams";
import { type ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

export default function useTopFilesBar() {
	const [searchParams, setSearchParams] = useSearchParams();
	const defaultSearch =
		searchParams.get(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.SEARCH) ?? "";

	function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
		setSearchParams(prevParams => {
			const params = new URLSearchParams(prevParams);
			params.set(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.SEARCH, e.target.value);
			params.set(FILES_SEARCH_PARAMS_KEYS.PAGE, "1");

			return params;
		});
	}

	return {
		handleSearchChange,
		defaultSearch,
	};
}
