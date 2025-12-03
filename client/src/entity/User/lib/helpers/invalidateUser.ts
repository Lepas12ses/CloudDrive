import queryClient from "@/shared/api/queryClient";
import { USER_QUERY_KEY } from "../consts";

export default function invalidateUser() {
	queryClient.invalidateQueries({
		queryKey: USER_QUERY_KEY,
	});
}
