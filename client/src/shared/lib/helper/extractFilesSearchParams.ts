import {
	FILES_SEARCH_PARAMS_KEYS,
	OPTIONAL_FILES_SEARCH_PARAMS_KEYS,
	type FilesSearchParams,
} from "@/shared/model/FilesSearchParams";
import { DEFAULT_SEARCH_PARAMS } from "../consts";

export default function extractFilesParams(
	searchParams: URLSearchParams
): FilesSearchParams {
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
		order: params.order ?? undefined,
	};
}
