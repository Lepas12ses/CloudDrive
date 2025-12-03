import type { FC } from "react";

interface ErrorDisplayProps {
	title: string;
	message?: string | null;
	className?: string;
}

const ErrorDisplay: FC<ErrorDisplayProps> = ({
	title,
	message = null,
	className = "",
}) => {
	return (
		<div
			className={`bg-red-200 w-fit py-2 px-4 rounded-md border border-red-300 text-red-900 ${className}`}
		>
			<p className='font-bold text-center'>{title}</p>
			{message && (
				<p className='font-semibold border-t border-t-red-400 border-dotted mt-2 pt-1'>
					{message}
				</p>
			)}
		</div>
	);
};

export default ErrorDisplay;
