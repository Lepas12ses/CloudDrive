import type { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import { useMenuContext } from "./Menu";

interface MenuButtonProps
	extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
	expandedContent?: string;
}

const MenuButton: FC<MenuButtonProps> = ({
	expandedContent = null,
	children,
	className,
	...props
}) => {
	const { isExpanded } = useMenuContext();

	const expandedClasses = `w-full justify-center items-center overflow-elipsis word-nowrap`;

	const classes = `text-nowrap transition-all flex gap-4 
    cursor-pointer bg-(--bg-light) shadow-md w-fit 
    p-3 mx-auto rounded-lg border-(--bg-dark) border 
    hover:bg-(--bg)
    ${isExpanded ? expandedClasses : ""}
    ${className ? className : ""}`;

	return (
		<button {...props} className={classes}>
			{isExpanded && expandedContent && (
				<p className='font-semibold'>{expandedContent}</p>
			)}
			{children}
		</button>
	);
};

export default MenuButton;
