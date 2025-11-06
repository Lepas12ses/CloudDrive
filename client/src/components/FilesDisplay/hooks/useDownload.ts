import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/http";
import type UserFile from "@/models/UserFile";
import userService from "@/service/UserService";
import downloadFile from "@/util/downloadFile";

export default function useDownload() {
	const { isError, error, isPending, mutate } = useMutation(
		{
			mutationFn: (file: UserFile) => userService.downloadFile(file.id),
			onSuccess(data, file) {
				downloadFile(data, file.name);
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
