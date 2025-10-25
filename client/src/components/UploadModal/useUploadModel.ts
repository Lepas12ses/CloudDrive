import { queryClient } from "@/http";
import userService from "@/service/UserService";
import { useMutation } from "@tanstack/react-query";

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
