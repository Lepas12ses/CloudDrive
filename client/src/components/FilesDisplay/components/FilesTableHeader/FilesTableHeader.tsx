import type { FC } from "react";
import HeaderSort from "./HeaderSort";
import HeaderButton from "./HeaderButton";

const FilesTableHeader: FC = () => {
	return (
		<thead>
			<tr>
				<HeaderSort sortField='name'>Название</HeaderSort>
				<HeaderSort sortField='date'>Дата изменения</HeaderSort>
				<HeaderSort sortField='size'>Размер файла</HeaderSort>
				<HeaderButton>Сортировка</HeaderButton>
			</tr>
		</thead>
	);
};

export default FilesTableHeader;
