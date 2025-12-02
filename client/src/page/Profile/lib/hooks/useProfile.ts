import queryClient from "@/shared/api/queryClient";
import userService from "@/shared/lib/service/UserService";
import { useQuery } from "@tanstack/react-query";

export default function useProfile() {
	const { data, isError, error, isPending } = useQuery(
		{
			queryKey: ["profile"],
			queryFn: ({ signal }) => userService.profile(signal),
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
