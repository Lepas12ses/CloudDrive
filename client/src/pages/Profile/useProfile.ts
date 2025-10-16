import { queryClient } from "@/http";
import userService from "@/service/UserService";
import { useQuery } from "@tanstack/react-query";

export default function useProfile() {
	const { data, isError, error, isPending } = useQuery(
		{
			queryKey: ["profile"],
			queryFn: userService.profile,
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
