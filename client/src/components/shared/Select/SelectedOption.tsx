import type { FC, PropsWithChildren } from "react";
import useSelectContext from "./SelectContext";

interface SelectedOptionProps {
	fallbackText?: string;
}

const SelectedOption: FC<SelectedOptionProps> = ({ fallbackText }) => {
	const { selectedValue, toggleExpanded, getSelectedOptionContent } =
		useSelectContext();

	const content = selectedValue
		? getSelectedOptionContent(selectedValue)
		: fallbackText;

	return (
		<button className='w-full' onClick={toggleExpanded}>
			{content}
		</button>
	);
};

export default SelectedOption;
