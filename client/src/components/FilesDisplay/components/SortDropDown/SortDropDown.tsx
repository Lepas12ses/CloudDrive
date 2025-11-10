import { useCallback, useState, type FC } from "react";

import HeaderButton from "../FilesTableHeader/HeaderButton";
import SortDropDownContent from "./SortDropDownContent";
import useClickOutside from "@/hooks/useClickOutside";

const SortDropDown: FC = () => {
	const [isVisible, setIsVisible] = useState(false);

	const handleClick = useCallback(() => {
		setIsVisible(prev => !prev);
	}, []);

	const handleClose = useCallback(() => {
		setIsVisible(false);
	}, []);

	const ref = useClickOutside<HTMLDivElement>(handleClose);

	return (
		<th>
			<div ref={ref} className='relative'>
				<HeaderButton onClick={handleClick}>Сортировка</HeaderButton>
				{isVisible && <SortDropDownContent />}
			</div>
		</th>
	);
};

export default SortDropDown;
