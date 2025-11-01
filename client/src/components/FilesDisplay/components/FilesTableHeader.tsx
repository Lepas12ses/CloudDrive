import type { FC, PropsWithChildren } from "react";

const Item: FC<PropsWithChildren> = ({ children }) => {
	return (
		<th>
			<button
				className={`h-12 w-full flex justify-start 
							items-center rounded-md hover:bg-stone-300`}
			>
				{children}
			</button>
		</th>
	);
};

const FilesTableHeader: FC = () => {
	return (
		<thead>
			<tr>
				<Item>Название</Item>
				<Item>Дата изменения</Item>
				<Item>Размер файла</Item>
				<Item>Сортировка</Item>
			</tr>
		</thead>
	);
};

export default FilesTableHeader;
