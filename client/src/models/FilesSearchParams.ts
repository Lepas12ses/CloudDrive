type FilesSearchParamsKeys = "page" | "limit" | "search";

export const FILES_SEARCH_PARAMS_KEYS = {
	PAGE: "page",
	LIMIT: "limit",
	SEARCH: "search",
} as const;

export type FilesSearchParams = Record<FilesSearchParamsKeys, string>;
