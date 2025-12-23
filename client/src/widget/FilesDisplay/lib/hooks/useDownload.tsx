import { useMutation } from "@tanstack/react-query";

import type { File } from "@/entity/File";
import downloadFile from "@/shared/lib/helper/downloadFile";
import queryClient from "@/shared/api/queryClient";
import fetchFileBlob from "../../api/downloadFile";
import { useEffect, useEffectEvent } from "react";
import useToast from "@/shared/lib/hooks/useToast";
import LoadingSpinner from "@/shared/ui/components/LoadingSpinner/LoadingSpinner";

export default function useDownload() {
	const { isError, error, isPending, mutate } = useMutation(
		{
			mutationFn: (file: File) => fetchFileBlob(file.id),
			onSuccess(data, file) {
				downloadFile(data, file.name);
			},
		},
		queryClient
	);
	const toast = useToast();

	function proceed(file: File) {
		mutate(file);
	}

	const showToast = useEffectEvent(() => {
		const id = toast.open(
			<div className='flex gap-3 items-center'>
				<LoadingSpinner />
				<p>Скачиваем файл</p>
			</div>,
			{ type: "info" }
		);

		return id;
	});

	const dismissToast = useEffectEvent((id: string) => {
		toast.close(id);
	});

	useEffect(() => {
		if (isPending) {
			const id = showToast();

			return () => {
				dismissToast(id);
			};
		}
		// TODO: Надо как-то подружить eslint с useEffectEvent
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPending]);

	return {
		isError,
		error,
		isPending,
		proceed,
	};
}
