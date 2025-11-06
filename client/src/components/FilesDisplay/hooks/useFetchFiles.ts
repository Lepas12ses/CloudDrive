import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import userService from "@/service/UserService";
import { queryClient } from "@/http";
import { FILES_SEARCH_PARAMS_KEYS } from "@/models/FilesSearchParams";
import { DEFAULT_SEARCH_PARAMS } from "../util/constants";
import extractFilesParams from "../util/extractFilesSearchParams";

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
