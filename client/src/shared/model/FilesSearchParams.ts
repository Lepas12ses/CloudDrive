type FilesSearchParamsKeys = "page" | "limit";
type OptionalFilesSearchParamsKeys = "search" | "sort" | "order";

export const FILES_SEARCH_PARAMS_KEYS = {
	PAGE: "page",
	LIMIT: "limit",
} as const;

export const OPTIONAL_FILES_SEARCH_PARAMS_KEYS = {
	SEARCH: "search",
	SORT: "sort",
	ORDER: "order",
} as const;

export type FilesSearchParams = Record<FilesSearchParamsKeys, string> &
	Partial<Record<OptionalFilesSearchParamsKeys, string>>;
