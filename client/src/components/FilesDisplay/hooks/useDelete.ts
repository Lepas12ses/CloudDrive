import { useMutation } from "@tanstack/react-query";

import type UserFile from "@/models/UserFile";
import userService from "@/service/UserService";
import { queryClient } from "@/http";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FILES_SEARCH_PARAMS_KEYS } from "@/models/FilesSearchParams";

export default function useDelete(files?: UserFile[]) {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const { isError, error, isPending, mutate } = useMutation(
		{
			mutationFn: (file: UserFile) => userService.deleteFile(file.id),
			onSuccess() {
				if (files?.length === 1) {
					const page = searchParams.get(FILES_SEARCH_PARAMS_KEYS.PAGE);

					if (page && page !== "1") {
						const params = new URLSearchParams(searchParams);
						params.set(
							FILES_SEARCH_PARAMS_KEYS.PAGE,
							(parseInt(page) - 1).toString()
						);
						navigate(`?${params.toString()}`, { replace: true });
					}
				}
				queryClient.invalidateQueries({ queryKey: ["files"] });
			},
		},
		queryClient
	);

	function proceed(file: UserFile) {
		mutate(file);
	}

	return {
		isError,
		error,
		isPending,
		proceed,
	};
}
