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

	return {
		isUploading,
		onCloseUploading,
		onOpenUpload,
		handleSearchChange,
		defaultSearch,
	};
}
