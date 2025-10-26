import {
	FILES_SEARCH_PARAMS_KEYS,
	OPTIONAL_FILES_SEARCH_PARAMS_KEYS,
} from "@/models/FilesSearchParams";
import { useState, type ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

export default function useTopFilesBar() {
	const [isUploading, setIsUploading] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const defaultSearch =
		searchParams.get(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.SEARCH) ?? "";

	function onCloseUploading() {
		setIsUploading(false);
	}

	function onOpenUpload() {
		setIsUploading(true);
	}

	function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
		setSearchParams(prevParams => {
			const params = new URLSearchParams(prevParams);
			params.set(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.SEARCH, e.target.value);
			params.set(FILES_SEARCH_PARAMS_KEYS.PAGE, "1");

			return params;
		});
	}

	function handleSortChange(value: string) {
		setSearchParams(prevParams => {
			const params = new URLSearchParams(prevParams);
			switch (value) {
				case "nameAsc": {
					params.set(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.SORT, "name");
					params.set(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.ORDER, "asc");
					break;
				}
				case "nameDesc": {
					params.set(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.SORT, "name");
					params.set(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.ORDER, "desc");
					break;
				}
				case "dateAsc": {
					params.set(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.SORT, "date");
					params.set(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.ORDER, "asc");
					break;
				}
				case "dateDesc": {
					params.set(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.SORT, "date");
					params.set(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.ORDER, "desc");
					break;
				}
				default: {
					params.delete(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.SORT);
					params.delete(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.ORDER);
				}
			}
			return params;
		});
	}

	return {
		isUploading,
		onCloseUploading,
		onOpenUpload,
		handleSearchChange,
		defaultSearch,
		onSortChange: handleSortChange,
	};
}

export const SORT_OPTIONS = new Map([
	["nameAsc", "По возрастанию имени"],
	["nameDesc", "По убыванию имени"],
	["dateAsc", "Старое"],
	["dateDesc", "Новое"],
]);
