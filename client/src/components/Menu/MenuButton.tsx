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

	const expandedClasses = `w-full justify-center overflow-elipsis word-nowrap`;

	const classes = `text-nowrap transition-all flex gap-4 
    cursor-pointer bg-stone-50 shadow-md w-fit 
    p-3 mx-auto rounded-lg border-stone-300 border 
    hover:bg-stone-200 
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
