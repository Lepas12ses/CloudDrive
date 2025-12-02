import cn from "@/shared/lib/helper/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type { FC, FormEvent, PropsWithChildren } from "react";
import useFormContext from "./FormContext";

const form = cva("flex", {
	variants: {
		direction: {
			ver: "flex-col",
		},
		gap: {
			s: "gap-1",
			m: "gap-3",
			l: "gap-5",
		},
	},
	defaultVariants: {
		direction: "ver",
	},
});

interface FormProps extends PropsWithChildren {
	className?: string;
	variants?: VariantProps<typeof form>;
}

const Form: FC<FormProps> = ({ children, className, variants }) => {
	const { onSubmit } = useFormContext();

	function submitForm(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const fd = new FormData(e.target as HTMLFormElement);

		onSubmit(fd);
	}

	const classes = cn(form(variants), className);

	return (
		<form className={classes} onSubmit={submitForm} noValidate>
			{children}
		</form>
	);
};

export default Form;
