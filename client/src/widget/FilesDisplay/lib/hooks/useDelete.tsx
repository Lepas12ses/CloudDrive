import { useMutation } from "@tanstack/react-query";
import { useEffectEvent, useEffect } from "react";

import queryClient from "@/shared/api/queryClient";
import type { File } from "@/entity/File";
import deleteFile from "../../api/deleteFile";
import LoadingSpinner from "@/shared/ui/components/LoadingSpinner/LoadingSpinner";
import useToast from "@/shared/lib/hooks/useToast";

export default function useDelete(onFileDelete?: (file: File) => void) {
	const { isError, error, isPending, mutate } = useMutation(
		{
			mutationFn: (file: File) => deleteFile(file.id),
			onSuccess(_, file) {
				if (onFileDelete) {
					onFileDelete(file);
				} else {
					queryClient.invalidateQueries({ queryKey: ["files"] });
				}
			},
		},
		queryClient
	);
	const toast = useToast();

	function proceed(file: File) {
		mutate(file);
	}

	const showDeletingToast = useEffectEvent(() => {
		const id = toast.open(
			<div className='flex gap-3 items-center'>
				<LoadingSpinner />
				<p>Удаляем файл</p>
			</div>,
			{ type: "info" }
		);

		return id;
	});

	const dismissDeletingToast = useEffectEvent((id: string) => {
		toast.close(id);
	});

	const showErrorToast = useEffectEvent(() => {
		toast.open(
			<div className='flex gap-3 items-center'>
				<p>Не удалось удалить файл (</p>
			</div>,
			{ type: "error", dismissTime: 4000 }
		);
	});

	useEffect(() => {
		if (isPending) {
			const id = showDeletingToast();

			return () => {
				dismissDeletingToast(id);
			};
		}
		// TODO: Надо как-то подружить eslint с useEffectEvent
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPending]);

	useEffect(() => {
		if (isError) {
			showErrorToast();
		}
		// TODO: Надо как-то подружить eslint с useEffectEvent
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isError]);

	return {
		isError,
		error,
		isPending,
		proceed,
	};
}
