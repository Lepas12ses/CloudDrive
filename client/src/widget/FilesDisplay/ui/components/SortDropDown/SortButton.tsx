import type { ComponentProps, FC, PropsWithChildren } from "react";

interface SortButtonProps extends PropsWithChildren, ComponentProps<"button"> {
	isSelected?: boolean;
}

const SortButton: FC<SortButtonProps> = ({
	children,
	isSelected = false,
	...props
}) => {
	const classes = `
    w-full text-start hover:bg-(--primary-light)
    py-1 px-2 text-nowrap border-b-1
	border-transparent transition-colors
	 ${isSelected ? "border-b-(--primary)" : ""}
    `;

	return (
		<button {...props} className={classes}>
			{children}
		</button>
	);
};

export default SortButton;
