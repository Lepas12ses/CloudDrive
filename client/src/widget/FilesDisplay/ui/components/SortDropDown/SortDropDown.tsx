import { useCallback, useRef, useState, type FC } from "react";

import HeaderButton from "../FilesTableHeader/HeaderButton";
import SortDropDownContent from "./SortDropDownContent";
import useClickOutside from "@/shared/lib/hooks/useClickOutside";

const SortDropDown: FC = () => {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	const handleClick = useCallback(() => {
		setIsVisible(prev => !prev);
	}, []);

	const handleClose = useCallback(() => {
		setIsVisible(false);
	}, []);

	useClickOutside<HTMLDivElement>(dropdownRef, handleClose);

	return (
		<th>
			<div ref={dropdownRef} className='relative'>
				<HeaderButton onClick={handleClick}>Сортировка</HeaderButton>
				{isVisible && <SortDropDownContent />}
			</div>
		</th>
	);
};

export default SortDropDown;
