import instance from "@/shared/api/credentialsAxiosInstance";
import wrapResponse from "@/shared/lib/helper/wrapResponse";

export default async function fetchFileBlob(fileId: number) {
	return await wrapResponse(async () => {
		const response = await instance.get<Blob>("files/download", {
			params: {
				fileId,
			},
			responseType: "blob",
		});

		return response.data;
	});
}
