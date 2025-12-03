import type { FC } from "react";
import useFieldContext from "./FieldContext";

const FieldError: FC = () => {
	const { error } = useFieldContext();

	if (error)
		return (
			<ul>
				{error.messages.map(message => (
					<li
						className="'bg-red-200 text-red-800 font-bold rounded-md py-1 px-2'"
						key={message}
					>
						{message}
					</li>
				))}
			</ul>
		);
};

export default FieldError;
