import type { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import Container from "@/shared/ui/components/Container";

interface PageButtonProps extends PropsWithChildren {
	link: string;
	current?: boolean;
}

const PageButton: FC<PageButtonProps> = ({
	children,
	link,
	current = false,
}) => {
	const classes = `flex items-center justify-center w-8 aspect-square `;

	if (current)
		return (
			<Container
				variants={{ color: "normal", shadow: "is" }}
				className='p-0 rounded-full'
			>
				<span className={classes}>{children}</span>
			</Container>
		);
	return (
		<Container
			variants={{ color: "light", shadow: "m" }}
			className='p-0 rounded-full'
		>
			<Link className={classes} to={link}>
				{children}
			</Link>
		</Container>
	);
};

export default PageButton;
