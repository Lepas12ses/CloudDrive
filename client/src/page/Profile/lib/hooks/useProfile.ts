import queryClient from "@/shared/api/queryClient";

import { useQuery } from "@tanstack/react-query";
import fetchProfile from "../../api/fetchProfile";

export default function useProfile() {
	const { data, isError, error, isPending } = useQuery(
		{
			queryKey: ["profile"],
			queryFn: ({ signal }) => fetchProfile(signal),
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
