import { useState } from "react";

export default function useTopFilesBar() {
	const [isUploading, setIsUploading] = useState(false);

	function onCloseUploading() {
		setIsUploading(false);
	}

	function onOpenUpload() {
		setIsUploading(true);
	}

	return {
		isUploading,
		onCloseUploading,
		onOpenUpload,
	};
}
