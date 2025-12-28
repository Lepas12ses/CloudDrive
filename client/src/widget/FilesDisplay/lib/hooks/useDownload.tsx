import { useMutation } from "@tanstack/react-query";

import type { File } from "@/entity/File";
import downloadFile from "@/shared/lib/helper/downloadFile";
import queryClient from "@/shared/api/queryClient";
import fetchFileBlob from "../../api/downloadFile";
import { useCallback, useEffect, useEffectEvent } from "react";
import useToast from "@/shared/lib/hooks/useToast";
import LoadingSpinner from "@/shared/ui/components/LoadingSpinner/LoadingSpinner";
import type ApiErrorResponse from "@/shared/model/ApiErrorResponse";

export default function useDownload() {
	const toast = useToast();

	const showDownloadSuccessToast = useCallback(() => {
		toast.open(
			<div className='flex gap-3 items-center'>
				<p>Файл успешно загружен</p>
			</div>,
			{ type: "success", dismissTime: 4000 }
		);
	}, [toast]);

	const showErrorToast = useCallback(() => {
		toast.open(
			<div className='flex gap-3 items-center'>
				<p>Не удалось скачать файл (</p>
			</div>,
			{ type: "error", dismissTime: 4000 }
		);
	}, [toast]);

	const { isError, error, isPending, mutate } = useMutation<
		Blob,
		ApiErrorResponse,
		File
	>(
		{
			mutationFn: (file: File) => fetchFileBlob(file.id),
			onSuccess(data, file) {
				downloadFile(data, file.name);
				showDownloadSuccessToast();
			},
			onError() {
				showErrorToast();
			},
		},
		queryClient
	);

	function proceed(file: File) {
		mutate(file);
	}

	const showDownloadingToast = useEffectEvent(() => {
		const id = toast.open(
			<div className='flex gap-3 items-center'>
				<LoadingSpinner />
				<p>Скачиваем файл</p>
			</div>,
			{ type: "info" }
		);

		return id;
	});

	const dismissDownloadingToast = useEffectEvent((id: string) => {
		toast.close(id);
	});

	useEffect(() => {
		if (isPending) {
			const id = showDownloadingToast();

			return () => {
				dismissDownloadingToast(id);
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
