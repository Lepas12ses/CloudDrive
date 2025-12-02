import { useMutation } from "@tanstack/react-query";

import type UserFile from "@/models/UserFile";
import userService from "@/shared/lib/service/UserService";
import queryClient from "@/shared/api/queryClient";

export default function useDelete(onFileDelete?: (file: UserFile) => void) {
	const { isError, error, isPending, mutate } = useMutation(
		{
			mutationFn: (file: UserFile) => userService.deleteFile(file.id),
			onSuccess(_, file) {
				if (onFileDelete) {
					onFileDelete(file);
				} else {
					queryClient.invalidateQueries({ queryKey: ["files"] });
				}
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
