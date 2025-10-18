import useDebounce from "@/http/useDebounce";
import type { ChangeEvent, FC } from "react";

interface SearchFieldProps {
	id: string;
	onChange: (value: string) => void;
	className?: string;
	delay?: number;
}

const SearchField: FC<SearchFieldProps> = ({
	id,
	onChange,
	className = "",
	delay = 500,
}) => {
	const debouncedChange = useDebounce(onChange, delay);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		debouncedChange(e.target.value);
	}

	const classes = `bg-stone-100 border border-stone-400 rounded-full px-5
                        ${className}`;

	return (
		<input
			className={classes}
			type='text'
			name={id}
			id={id}
			onChange={handleChange}
		/>
	);
};

export default SearchField;
