import type { FC, HTMLProps } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {
	id: string;
	label: string;
}

const Input: FC<InputProps> = ({ id, label, ...props }) => {
	return (
		<div className='flex flex-col gap-1'>
			<label htmlFor={id}>{label}</label>
			<input
				{...props}
				className='bg-stone-200 border border-stone-300 rounded-md'
				id={id}
				name={id}
			/>
		</div>
	);
};

export default Input;
