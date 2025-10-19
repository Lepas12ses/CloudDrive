import type { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface PageButtonProps extends PropsWithChildren {
	link: string;
	current?: boolean;
}

const PageButton: FC<PageButtonProps> = ({
	children,
	link,
	current = false,
}) => {
	const classes = `flex items-center justify-center w-8 aspect-square rounded-md bg-stone-300 `;
	const currentClasses = `${classes} opacity-50`;

	if (current) return <span className={currentClasses}>{children}</span>;
	return (
		<Link className={classes} to={link}>
			{children}
		</Link>
	);
};

export default PageButton;
