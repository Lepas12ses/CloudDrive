import useDelete from "./useDelete";
import useDownload from "./useDownload";
import useFetchFiles from "./useFetchFiles";

export default function useFilesDisplay() {
	const fetching = useFetchFiles();

	const downloading = useDownload();

	const deletion = useDelete(fetching.data?.files);

	return {
		fetching,
		downloading,
		deletion,
	};
}
