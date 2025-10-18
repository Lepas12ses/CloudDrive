import { queryClient } from "@/http";
import type UserFile from "@/models/UserFile";
import userService from "@/service/UserService";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useFiles() {
	const { data, isError, error, isPending } = useQuery(
		{
			queryKey: ["files"],
			queryFn: userService.files,
		},
		queryClient
	);

	const { isPending: downloadPending, mutate: downloadFile } = useMutation(
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

	const { isPending: deletePending, mutate: deleteFile } = useMutation(
		{
			mutationFn: (file: UserFile) => userService.deleteFile(file.id),
			onSuccess() {
				queryClient.invalidateQueries({ queryKey: ["files"] });
			},
		},
		queryClient
	);

	function onDownloadFile(file: UserFile) {
		downloadFile(file);
	}

	function onDeleteFile(file: UserFile) {
		deleteFile(file);
	}

	return {
		data,
		isError,
		error,
		isPending,
		onDownloadFile,
		onDeleteFile,
	};
}
