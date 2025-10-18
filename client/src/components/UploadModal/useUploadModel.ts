import { queryClient } from "@/http";
import userService from "@/service/UserService";
import { useMutation } from "@tanstack/react-query";
import type { FormEvent } from "react";

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

	function onUpload(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const fd = new FormData(e.target as HTMLFormElement);
		mutate(fd);
	}

	return {
		onUpload,
	};
}
