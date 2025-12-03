import wrapResponse from "@/shared/lib/helper/wrapResponse";
import instance from "@/shared/api/credentialsAxiosInstance";

export default async function uploadFile(fd: FormData) {
	return await wrapResponse(async () => {
		await instance.postForm("files/upload", fd);
	});
}
