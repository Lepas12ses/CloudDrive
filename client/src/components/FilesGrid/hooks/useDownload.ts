import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/http";
import type UserFile from "@/models/UserFile";
import userService from "@/service/UserService";

export default function useDownload() {
	const { isError, error, isPending, mutate } = useMutation(
		{
			mutationFn: (file: UserFile) => userService.downloadFile(file.id),
			onSuccess(data, file) {
				const url = window.URL.createObjectURL(data);
				const link = document.createElement("a");
				link.setAttribute("download", file.name);
				link.href = url;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
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
