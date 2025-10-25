import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import userService from "@/service/UserService";
import { queryClient } from "@/http";
import {
	FILES_SEARCH_PARAMS_KEYS,
	OPTIONAL_FILES_SEARCH_PARAMS_KEYS,
	type FilesSearchParams,
} from "@/models/FilesSearchParams";

const DEFAULT_SEARCH_PARAMS: FilesSearchParams = {
	page: "1",
	limit: "10",
};

function extractFilesParams(searchParams: URLSearchParams): FilesSearchParams {
	const params = {
		page: searchParams.get(FILES_SEARCH_PARAMS_KEYS.PAGE),
		limit: searchParams.get(FILES_SEARCH_PARAMS_KEYS.LIMIT),
		search: searchParams.get(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.SEARCH),
		sort: searchParams.get(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.SORT),
		order: searchParams.get(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.ORDER),
	};

	return {
		page: params.page ?? DEFAULT_SEARCH_PARAMS.page,
		limit: params.limit ?? DEFAULT_SEARCH_PARAMS.limit,
		search: params.search ?? undefined,
		sort: params.sort ?? undefined,
		order: params.sort ?? undefined,
	};
}

export default function useFetchFiles() {
	const [searchParams] = useSearchParams(DEFAULT_SEARCH_PARAMS);
	const filesParams = extractFilesParams(searchParams);

	const { data, isError, error, isPending } = useQuery(
		{
			queryKey: ["files", filesParams],
			queryFn: ({ signal }) => userService.files(filesParams, signal),
		},
		queryClient
	);

	function pageLinkConstructor(page: number) {
		const params = new URLSearchParams(searchParams);
		params.set(FILES_SEARCH_PARAMS_KEYS.PAGE, page.toString());

		return `?${params.toString()}`;
	}

	return {
		data,
		isError,
		error,
		isPending,
		pageLinkConstructor,
		cardLimit: parseInt(filesParams.limit),
	};
}
