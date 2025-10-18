import useDelete from "./useDelete";
import useDownload from "./useDownload";
import useFetchFiles from "./useFetchFiles";

export default function useFiles() {
	const fetching = useFetchFiles();

	const downloading = useDownload();

	const deletion = useDelete();

	return {
		fetching,
		downloading,
		deletion,
	};
}
