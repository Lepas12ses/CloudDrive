import type { FC, PropsWithChildren } from "react";
import { useMenuContext } from "./Menu";
import {
	NavLink,
	type NavLinkProps,
	type NavLinkRenderProps,
} from "react-router-dom";
import Container from "../shared/Container";

interface MenuLinkProps extends PropsWithChildren<NavLinkProps> {
	expandedContent?: string;
}

const MenuLink: FC<MenuLinkProps> = ({
	expandedContent = null,
	children,
	className,
	...props
}) => {
	const { isExpanded } = useMenuContext();

	const expandedClasses = `w-full justify-center overflow-elipsis word-nowrap`;

	function getClasses(navProps: NavLinkRenderProps) {
		const { isActive } = navProps;

		const classes = `text-nowrap transition-all flex gap-4 
        shadow-s w-fit p-3 mx-auto
		rounded-lg border-(--bg-dark) border 
        ${
					isActive
						? "cursor-default ishadow-s"
						: " bg-(--bg-light) hover:bg-(--bg)"
				}
        ${isExpanded ? expandedClasses : ""}
        ${className ? className : ""}`;

		return classes;
	}

	return (
		<NavLink {...props} className={getClasses}>
			{isExpanded && expandedContent && (
				<p className='font-semibold'>{expandedContent}</p>
			)}
			{children}
		</NavLink>
	);
};

export default MenuLink;
