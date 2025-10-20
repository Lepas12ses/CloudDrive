import type { FC, PropsWithChildren } from "react";

const InputError: FC<PropsWithChildren> = ({ children }) => {
	return (
		<p className='bg-red-200 text-red-800 font-bold rounded-md py-1 px-2'>
			{children}
		</p>
	);
};

export default InputError;
