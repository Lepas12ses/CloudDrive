import type { FC } from "react";
import HeaderSort from "./HeaderSort";
import HeaderButton from "./HeaderButton";

const FilesTableHeader: FC = () => {
	return (
		<thead>
			<tr>
				<HeaderSort sortField='name'>Название</HeaderSort>
				<HeaderSort sortField='date' className='hidden md:table-cell'>
					Дата изменения
				</HeaderSort>
				<HeaderSort sortField='size' className='hidden lg:table-cell'>
					Размер файла
				</HeaderSort>
				<HeaderButton>Сортировка</HeaderButton>
			</tr>
		</thead>
	);
};

export default FilesTableHeader;
