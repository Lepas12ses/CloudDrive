import type { ButtonHTMLAttributes, FC } from "react";

import cn from "@/util/cn";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva("px-2 py-1.5 rounded-xl font-bold", {
	variants: {
		color: {
			primary: "",
		},
		style: {
			fill: "",
			outline: "",
		},
	},
	compoundVariants: [
		{
			color: "primary",
			style: "fill",
			class: "bg-(--primary) text-(--text-primary) hover:opacity-50",
		},
		{
			color: "primary",
			style: "outline",
			class: "border-2 border-(--primary) text-(--primary)",
		},
	],
	defaultVariants: {
		color: "primary",
		style: "fill",
	},
});

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	disabled?: boolean;
	className?: string;
	variants?: VariantProps<typeof button>;
}

const Button: FC<ButtonProps> = ({
	children,
	className,
	variants,
	...props
}) => {
	const classes = cn(button({ ...variants, className }));

	return (
		<button {...props} className={classes}>
			{children}
		</button>
	);
};

export default Button;
