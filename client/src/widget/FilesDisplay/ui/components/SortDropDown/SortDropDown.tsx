import { useRef, type FC } from "react";

import HeaderButton from "../FilesTableHeader/HeaderButton";
import SortDropDownContent from "./SortDropDownContent";
import useClickOutside from "@/shared/lib/hooks/useClickOutside";
import useVisibility from "@/shared/lib/hooks/useVisibility";

const SortDropDown: FC = () => {
	const dropdownRef = useRef<HTMLDivElement>(null);

	const { isVisible, hide, toggle } = useVisibility();

	useClickOutside<HTMLDivElement>(dropdownRef, hide);

	return (
		<div ref={dropdownRef} className='relative'>
			<HeaderButton onClick={toggle}>Сортировка</HeaderButton>
			{isVisible && <SortDropDownContent />}
		</div>
	);
};

export default SortDropDown;
