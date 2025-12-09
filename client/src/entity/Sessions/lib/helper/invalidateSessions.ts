import queryClient from "@/shared/api/queryClient";
import { SESSIONS_QUERY_KEY } from "../consts";

export default function invalidateSessions() {
	queryClient.invalidateQueries({
		queryKey: SESSIONS_QUERY_KEY,
	});
}
