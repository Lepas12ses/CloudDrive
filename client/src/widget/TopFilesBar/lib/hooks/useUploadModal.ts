import { useMutation } from "@tanstack/react-query";

import queryClient from "@/shared/api/queryClient";
import uploadFile from "../../api/uploadFile";

export default function useUploadModal(onSuccess: () => void) {
	const { mutate } = useMutation(
		{
			mutationFn: uploadFile,
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
