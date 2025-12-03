import type { FC, InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import useFieldContext from "./FieldContext";
import cn from "@/shared/lib/helper/cn";

const input = cva("px-2 py-1 rounded-md text-(--text)", {
	variants: {
		color: {
			light: "bg-(--bg-light)",
			normal: "bg-(--bg)",
			dark: "bg-(--bg-dark)",
		},
	},
	defaultVariants: {
		color: "light",
	},
});

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	variants?: VariantProps<typeof input>;
}

const Input: FC<InputProps> = ({ variants, className, ...props }) => {
	const { id } = useFieldContext();

	const classes = cn(input(variants), className);

	return <input {...props} className={classes} name={id} id={id} />;
};

export default Input;
