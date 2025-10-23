import type { FC, HTMLAttributes } from "react";
import useFieldContext from "./FieldContext";

const Label: FC<HTMLAttributes<HTMLLabelElement>> = ({
	children,
	...props
}) => {
	const { id } = useFieldContext();

	return (
		<label {...props} htmlFor={id}>
			{children}
		</label>
	);
};

export default Label;
