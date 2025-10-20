import { type FC, type InputHTMLAttributes } from "react";

import { useInputContext } from "./Input";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "@/util/cn";

const inputField = cva("px-2 py-1 rounded-md text-(--text)", {
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

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	variants?: VariantProps<typeof inputField>;
}

const InputField: FC<InputFieldProps> = ({ variants, className, ...props }) => {
	const classes = cn(inputField({ ...variants, className }));

	const { id } = useInputContext();

	return <input {...props} id={id} name={id} className={classes} />;
};

export default InputField;
