import { queryClient } from "@/http";
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

	return {
		data,
		isError,
		error,
		isPending,
	};
}
