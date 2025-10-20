import cn from "@/util/cn";
import type { FC, PropsWithChildren } from "react";
import { Link, type LinkProps } from "react-router-dom";

interface RouterLinkProps extends PropsWithChildren<LinkProps> {}

const RouterLink: FC<RouterLinkProps> = ({ className, children, ...props }) => {
	const classes = cn(`text-(--primary) hover:opacity-50}`, className);
	return (
		<Link className={classes} {...props}>
			{children}
		</Link>
	);
};

export default RouterLink;
