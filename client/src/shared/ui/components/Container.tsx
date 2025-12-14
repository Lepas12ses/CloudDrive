import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type PropsWithChildren } from "react";

import cn from "@/shared/lib/helper/cn";

export const container = cva(null, {
	variants: {
		color: {
			light: "bg-(--bg-light)",
			normal: "bg-(--bg)",
			dark: "bg-(--bg-dark)",
			transparent: "",
		},
		padding: {
			s: "py-1.5 px-2",
			m: "py-3 px-4.5",
			l: "py-4.5 px-6",
		},
		shadow: {
			s: "shadow-s",
			m: "shadow-m",
			l: "shadow-l",
			is: "ishadow-s",
			im: "ishadow-m",
			il: "ishadow-l",
		},
	},

	defaultVariants: {
		color: "normal",
		padding: "m",
	},
});

export interface ContainerProps
	extends PropsWithChildren,
		HTMLAttributes<HTMLDivElement> {
	variants?: VariantProps<typeof container>;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
	({ children, className, variants, ...props }, ref) => {
		const classes = cn(container({ ...variants, className }));

		return (
			<div ref={ref} className={classes} {...props}>
				{children}
			</div>
		);
	}
);

export default Container;
