import { useQuery } from "@tanstack/react-query";

import queryClient from "@/shared/api/queryClient";
import fetchUser from "../../api/fetchUser";
import { USER_QUERY_KEY } from "../consts";

export default function useUserQuery() {
	return useQuery(
		{
			queryKey: USER_QUERY_KEY,
			queryFn: ({ signal }) => fetchUser(signal),
		},
		queryClient
	);
}
