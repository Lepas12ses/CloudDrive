const UNIT_THRESHOLD = 300;

export default function convertFileSize(sizeInBytes: number): string {
	let size = sizeInBytes;

	if (size < UNIT_THRESHOLD) {
		return `${size.toFixed(2)} байт`;
	}

	size /= 1024;

	if (size < UNIT_THRESHOLD) {
		return `${size.toFixed(2)} Кбайт`;
	}

	size /= 1024;

	if (size < UNIT_THRESHOLD) {
		return `${size.toFixed(2)} Мбайт`;
	}

	size /= 1024;

	return `${size.toFixed(2)} Гбайт`;
}
