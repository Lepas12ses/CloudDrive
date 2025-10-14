import type { ButtonHTMLAttributes, FC } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, ...props }) => {
	return (
		<button
			{...props}
			className='mt-2 px-4 py-2 bg-blue-400 text-white font-bold rounded-sm hover:opacity-50 cursor-pointer'
		>
			{children}
		</button>
	);
};

export default Button;
