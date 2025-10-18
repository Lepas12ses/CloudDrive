import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import userService from "@/service/UserService";
import { queryClient } from "@/http";
import type { FilesSearchParams } from "@/models/FilesSearchParams";

const DEFAULT_SEARCH_PARAMS: FilesSearchParams = {
	page: "1",
	limit: "10",
	search: "",
};

function extractFilesParams(searchParams: URLSearchParams): FilesSearchParams {
	const params = {
		page: searchParams.get("page"),
		limit: searchParams.get("limit"),
		search: searchParams.get("search"),
	};

	return {
		page: params.page ?? DEFAULT_SEARCH_PARAMS.page,
		limit: params.limit ?? DEFAULT_SEARCH_PARAMS.limit,
		search: params.search ?? DEFAULT_SEARCH_PARAMS.search,
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

	return {
		data,
		isError,
		error,
		isPending,
	};
}
