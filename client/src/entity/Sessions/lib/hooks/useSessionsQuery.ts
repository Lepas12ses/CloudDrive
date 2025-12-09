import { useQuery } from "@tanstack/react-query";

import { SESSIONS_QUERY_KEY } from "../consts";
import queryClient from "@/shared/api/queryClient";
import fetchSessions from "../../api/fetchSessions";

export default function useSessionsQuery() {
	return useQuery(
		{
			queryKey: SESSIONS_QUERY_KEY,
			queryFn: ({ signal }) => fetchSessions(signal),
		},
		queryClient
	);
}
