import type { FC } from "react";
import PageButton from "./PageButton";
import usePages from "./usePages";
import SkeletonField from "../SkeletonField/SkeletonField";
import Container from "../Container";

interface PagesProps {
	currentPage: number;
	totalPages: number;
	linkConstructor: (page: number) => string;
}

const PagesComponent: FC<PagesProps> = ({
	currentPage,
	totalPages,
	linkConstructor,
}) => {
	const { first, firstSpacer, last, lastSpacer, pages } = usePages(
		currentPage,
		totalPages
	);

	return (
		<ul className={`flex w-full justify-center gap-5`}>
			{first && (
				<>
					<li>
						<PageButton link={linkConstructor(1)}>1</PageButton>
					</li>

					{firstSpacer && (
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
			{last && (
				<>
					{lastSpacer && (
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
	);
};

const PagesSkeleton: FC = () => {
	return (
		<Container
			variants={{ shadow: "l" }}
			className='p-0 h-10 w-1/2 mx-auto rounded-md overflow-hidden'
		>
			<SkeletonField className='w-full h-full' />
		</Container>
	);
};

const Pages = {
	Component: PagesComponent,
	Skeleton: PagesSkeleton,
};

export default Pages;
