import { useMutation } from "@tanstack/react-query";

import queryClient from "@/shared/api/queryClient";
import type { File } from "@/entity/File";
import deleteFile from "../../api/deleteFile";

export default function useDelete(onFileDelete?: (file: File) => void) {
	const { isError, error, isPending, mutate } = useMutation(
		{
			mutationFn: (file: File) => deleteFile(file.id),
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

	function proceed(file: File) {
		mutate(file);
	}

	return {
		isError,
		error,
		isPending,
		proceed,
	};
}
