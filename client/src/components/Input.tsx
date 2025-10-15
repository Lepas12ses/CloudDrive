import type { FC, HTMLProps } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {
	id: string;
	label: string;
	error?: string;
}

const Input: FC<InputProps> = ({ id, label, error, ...props }) => {
	return (
		<div className='flex flex-col gap-1'>
			<label htmlFor={id}>{label}</label>
			<input
				{...props}
				className='bg-stone-200 border border-stone-300 rounded-md'
				id={id}
				name={id}
			/>
			{error && (
				<p className='bg-red-200 text-red-800 font-bold rounded-md py-1 px-2'>
					{error}
				</p>
			)}
		</div>
	);
};

export default Input;
