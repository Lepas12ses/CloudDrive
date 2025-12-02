import { useMutation } from "@tanstack/react-query";

import type UserFile from "@/models/UserFile";
import userService from "@/shared/lib/service/UserService";
import { queryClient } from "@/http";

export default function useDelete() {
	const { isError, error, isPending, mutate } = useMutation(
		{
			mutationFn: (file: UserFile) => userService.deleteFile(file.id),
			onSuccess() {
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
