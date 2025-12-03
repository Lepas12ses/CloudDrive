import {
	useCallback,
	type ChangeEvent,
	type FC,
	type HTMLAttributes,
} from "react";

import useDebounce from "@/shared/lib/hooks/useDebounce";

interface SearchFieldProps extends HTMLAttributes<HTMLInputElement> {
	id: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	delay?: number;
}

const SearchField: FC<SearchFieldProps> = ({
	id,
	onChange,
	delay = 500,
	...props
}) => {
	const debouncedChange = useDebounce(onChange, delay);

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			debouncedChange(e);
		},
		[debouncedChange]
	);

	return (
		<input
			{...props}
			className={`px-2 h-8 w-full max-w-75 border-b border-(--border)`}
			type='text'
			name={id}
			id={id}
			onChange={handleChange}
			placeholder='Поиск'
		/>
	);
};

export default SearchField;
