import useDebounce from "@/hooks/useDebounce";
import { type ChangeEvent, type FC, type HTMLAttributes } from "react";

interface SearchFieldProps extends HTMLAttributes<HTMLInputElement> {
	id: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	delay?: number;
}

const SearchField: FC<SearchFieldProps> = ({
	id,
	onChange,
	className = "",
	delay = 500,
	...props
}) => {
	const debouncedChange = useDebounce(onChange, delay);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		debouncedChange(e);
	}

	const classes = `bg-stone-100 border border-stone-400 rounded-full px-5
                        ${className}`;

	return (
		<input
			{...props}
			className={classes}
			type='text'
			name={id}
			id={id}
			onChange={handleChange}
		/>
	);
};

export default SearchField;
