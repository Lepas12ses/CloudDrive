import type { FC, PropsWithChildren } from "react";
import { useMenuContext } from "./Menu";
import {
	NavLink,
	type NavLinkProps,
	type NavLinkRenderProps,
} from "react-router-dom";

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
        shadow-md w-fit 
        p-3 mx-auto rounded-lg border-stone-300 border 
        ${
					isActive
						? "cursor-default bg-blue-100"
						: " bg-stone-50 hover:bg-stone-200"
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
