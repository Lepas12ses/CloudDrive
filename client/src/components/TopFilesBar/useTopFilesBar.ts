import { FILES_SEARCH_PARAMS_KEYS } from "@/models/FilesSearchParams";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useTopFilesBar() {
	const [isUploading, setIsUploading] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	function onCloseUploading() {
		setIsUploading(false);
	}

	function onOpenUpload() {
		setIsUploading(true);
	}

	function handleSearchChange(value: string) {
		setSearchParams(prevParams => {
			const params = new URLSearchParams(prevParams);
			params.set(FILES_SEARCH_PARAMS_KEYS.SEARCH, value);

			return params;
		});
	}

	return {
		isUploading,
		onCloseUploading,
		onOpenUpload,
		handleSearchChange,
	};
}
