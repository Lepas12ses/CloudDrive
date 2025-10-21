export default function usePages(
	currentPage: number,
	totalPages: number,
	radius: number = 2
) {
	const pages: number[] = [];
	let leftDiff = 0;
	let rightDiff = 0;
	for (let page = currentPage - radius; page <= currentPage + radius; page++) {
		if (page > 0 && page <= totalPages) {
			pages.push(page);
		}
	}
	leftDiff = pages[0] - 1;
	rightDiff = totalPages - pages[pages.length - 1];

	return {
		first: leftDiff > 0,
		firstSpacer: leftDiff > 1,
		last: rightDiff > 0,
		lastSpacer: rightDiff > 1,
		pages,
	};
}
