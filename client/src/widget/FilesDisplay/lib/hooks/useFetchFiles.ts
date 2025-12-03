import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import { FILES_SEARCH_PARAMS_KEYS } from "@/shared/model/FilesSearchParams";
import queryClient from "@/shared/api/queryClient";
import extractFilesParams from "@/shared/lib/helper/extractFilesSearchParams";
import { DEFAULT_SEARCH_PARAMS } from "@/shared/lib/consts";
import fetchFiles from "../../api/fetchFiles";

export default function useFetchFiles() {
	const [searchParams] = useSearchParams(DEFAULT_SEARCH_PARAMS);
	const filesParams = extractFilesParams(searchParams);
	const navigate = useNavigate();

	const { data, isError, error, isPending } = useQuery(
		{
			queryKey: ["files", filesParams],
			queryFn: ({ signal }) => fetchFiles(filesParams, signal),
		},
		queryClient
	);

	function pageLinkConstructor(page: number) {
		const params = new URLSearchParams(searchParams);
		params.set(FILES_SEARCH_PARAMS_KEYS.PAGE, page.toString());

		return `?${params.toString()}`;
	}

	function onFileDelete() {
		if (data?.files.length === 1) {
			const { page } = filesParams;

			if (page !== "1") {
				const params = new URLSearchParams(searchParams);
				params.set(
					FILES_SEARCH_PARAMS_KEYS.PAGE,
					(parseInt(page) - 1).toString()
				);
				navigate(`?${params.toString()}`, { replace: true });
			}
		}

		queryClient.invalidateQueries({ queryKey: ["files"] });
	}

	return {
		data,
		isError,
		error,
		isPending,
		pageLinkConstructor,
		cardLimit: parseInt(filesParams.limit),
		onFileDelete,
	};
}
