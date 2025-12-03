import instance from "@/shared/api/credentialsAxiosInstance";
import wrapResponse from "@/shared/lib/helper/wrapResponse";

export default async function deleteFile(fileId: number) {
	return await wrapResponse(async () => {
		await instance.delete<void>("files/delete", {
			params: {
				fileId,
			},
		});
	});
}
