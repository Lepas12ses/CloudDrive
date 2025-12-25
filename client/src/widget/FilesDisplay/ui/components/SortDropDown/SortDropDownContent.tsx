import { useEffect, useState, type FC } from "react";
import { useSearchParams } from "react-router-dom";

import Button from "@/shared/ui/components/Button";
import Container from "@/shared/ui/components/Container";
import { OPTIONAL_FILES_SEARCH_PARAMS_KEYS } from "@/shared/model/FilesSearchParams";
import SortButton from "./SortButton";
import classes from "./SortDropDownContent.module.scss";

const SortDropDownContent: FC = () => {
	const [sort, setSort] = useState<"name" | "date" | "size" | null>(null);
	const [order, setOrder] = useState<"asc" | "desc" | null>(null);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const sort = searchParams.get(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.SORT);
		const order = searchParams.get(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.ORDER);

		if (sort === "name" || sort === "date" || sort === "size") setSort(sort);
		if (order === "asc" || order === "desc") setOrder(order);
	}, [searchParams]);

	function handleApply() {
		setSearchParams(prevParams => {
			const params = new URLSearchParams(prevParams);

			if (order && sort) {
				params.set(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.SORT, sort);
				params.set(OPTIONAL_FILES_SEARCH_PARAMS_KEYS.ORDER, order);
			}

			return params;
		});
	}

	let ascText: string | null = null;
	let descText: string | null = null;

	switch (sort) {
		case "name": {
			ascText = "От А до Я";
			descText = "От Я до А";
			break;
		}
		case "date": {
			ascText = "Старые";
			descText = "Новые";
			break;
		}
		case "size": {
			ascText = "Маленькие";
			descText = "Большие";
			break;
		}
	}

	return (
		<Container variants={{ shadow: "m" }} className={`${classes.content}`}>
			<div className='flex flex-col gap-0.5'>
				<SortButton
					isSelected={sort === "name"}
					onClick={() => setSort("name")}
				>
					По имени
				</SortButton>
				<SortButton
					isSelected={sort === "date"}
					onClick={() => setSort("date")}
				>
					По дате
				</SortButton>
				<SortButton
					isSelected={sort === "size"}
					onClick={() => setSort("size")}
				>
					По размеру
				</SortButton>
			</div>
			{sort && (
				<>
					<hr className='border-(--border)' />
					<div className='flex flex-col gap-0.5'>
						<SortButton
							isSelected={order === "asc"}
							onClick={() => setOrder("asc")}
						>
							{ascText}
						</SortButton>
						<SortButton
							isSelected={order === "desc"}
							onClick={() => setOrder("desc")}
						>
							{descText}
						</SortButton>
					</div>
				</>
			)}
			<Button onClick={handleApply} className='mt-1'>
				Применить
			</Button>
		</Container>
	);
};

export default SortDropDownContent;
