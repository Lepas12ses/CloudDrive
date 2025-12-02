import userService from "@/shared/lib/service/UserService";
import { useMutation } from "@tanstack/react-query";

import queryClient from "@/shared/api/queryClient";

export default function useUploadModel(onSuccess: () => void) {
	const { mutate } = useMutation(
		{
			mutationFn: userService.upload,
			onSuccess() {
				queryClient.invalidateQueries({
					queryKey: ["files"],
				});
				onSuccess();
			},
		},
		queryClient
	);

	function onUpload(fd: FormData) {
		mutate(fd);
	}

	return {
		onUpload,
	};
}
