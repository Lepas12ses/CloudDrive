import { useMutation } from "@tanstack/react-query";

import type { File } from "@/entity/File";
import downloadFile from "@/shared/lib/helper/downloadFile";
import queryClient from "@/shared/api/queryClient";
import fetchFileBlob from "../../api/downloadFile";

export default function useDownload() {
	const { isError, error, isPending, mutate } = useMutation(
		{
			mutationFn: (file: File) => fetchFileBlob(file.id),
			onSuccess(data, file) {
				downloadFile(data, file.name);
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
