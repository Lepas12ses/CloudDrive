import { queryClient } from "@/http";
import type UserFile from "@/models/UserFile";
import userService from "@/service/UserService";
import { useQuery } from "@tanstack/react-query";

export default function useFiles() {
	const { data, isError, error, isPending } = useQuery(
		{
			queryKey: ["files"],
			queryFn: userService.files,
		},
		queryClient
	);

	async function download(file: UserFile) {
		const data = await userService.downloadFile(file.id);
		const url = window.URL.createObjectURL(data);
		const link = document.createElement("a");

		link.href = url;
		link.setAttribute("download", file.name);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	return {
		data,
		isError,
		error,
		isPending,
		download,
	};
}
