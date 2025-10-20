import { type FC, type PropsWithChildren } from "react";

import { useInputContext } from "./Input";

interface InputLabelProps extends PropsWithChildren {
	className?: string;
}

const InputLabel: FC<InputLabelProps> = ({ className, children, ...props }) => {
	const { id } = useInputContext();

	return (
		<label {...props} htmlFor={id} className={className}>
			{children}
		</label>
	);
};

export default InputLabel;
