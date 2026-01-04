import { type FC } from "react";

import useSearch from "../../lib/hooks/useSearch";

const SearchField: FC = () => {
	const { handleSearchChange, searchValue } = useSearch();

	return (
		<input
			className={`px-2 h-8 w-full max-w-75
				 		border-b border-(--border)`}
			type='text'
			name={"search"}
			id={"search"}
			onChange={handleSearchChange}
			placeholder='Поиск'
			defaultValue={searchValue}
		/>
	);
};

export default SearchField;
