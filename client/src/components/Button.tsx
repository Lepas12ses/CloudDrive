import type { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	disabled?: boolean;
	clasName?: string;
}

const Button: FC<ButtonProps> = ({
	children,
	className = "",
	disabled = false,
	...props
}) => {
	const classes = `
	px-4 py-2 bg-blue-400
	text-white font-bold rounded-sm 
	${disabled ? "opacity-50" : "hover:opacity-50 cursor-pointer"}
	${className}`;

	return (
		<button {...props} className={classes} disabled={disabled}>
			{children}
		</button>
	);
};

export default Button;
