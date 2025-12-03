import { type FC, type PropsWithChildren } from "react";
import useSelectContext from "./SelectContext";

interface OptionProps extends PropsWithChildren {
	value: string;
}

const Option: FC<OptionProps> = ({ children, value }) => {
	const { onSelect, selectedValue } = useSelectContext();

	function handleSelect() {
		onSelect(value);
	}

	if (value === selectedValue) return;

	return (
		<button className='hover:opacity-50' onClick={handleSelect}>
			{children}
		</button>
	);
};

export default Option;
