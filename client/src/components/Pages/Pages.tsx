import type { FC } from "react";
import PageButton from "./PageButton";

interface PagesProps {
	currentPage: number;
	totalPages: number;
	linkConstructor: (page: number) => string;
}

const Pages: FC<PagesProps> = ({
	currentPage,
	totalPages,
	linkConstructor,
}) => {
	const radius = 2;
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

	return (
		<div>
			<ul className={`flex w-full justify-center gap-5`}>
				{leftDiff > 0 && (
					<>
						<li>
							<PageButton link={linkConstructor(1)}>1</PageButton>
						</li>

						{leftDiff > 1 && (
							<li>
								<span>...</span>
							</li>
						)}
					</>
				)}
				{pages.map(page => {
					const pageLink = linkConstructor(page);

					return (
						<li key={page}>
							<PageButton link={pageLink} current={page === currentPage}>
								{page}
							</PageButton>
						</li>
					);
				})}
				{rightDiff > 0 && (
					<>
						{rightDiff > 1 && (
							<li>
								<span>...</span>
							</li>
						)}
						<li>
							<PageButton link={linkConstructor(totalPages)}>
								{totalPages}
							</PageButton>
						</li>
					</>
				)}
			</ul>
		</div>
	);
};

export default Pages;
