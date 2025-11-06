export default function downloadFile(data: Blob, fileName: string) {
	const url = window.URL.createObjectURL(data);
	const link = document.createElement("a");
	link.setAttribute("download", fileName);
	link.href = url;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
