import { useState, type FC, type PropsWithChildren } from "react";
import { SelectContext, type ISelectContext } from "./SelectContext";

interface SelectProviderProps extends PropsWithChildren {
	onChange: (value: string) => void;
	defaultValue?: string;
	getSelectedOptionContent: (value: string) => string;
}

const SelectProvider: FC<SelectProviderProps> = ({
	children,
	onChange,
	defaultValue,
	getSelectedOptionContent,
}) => {
	const [selectedValue, setSelectedValue] = useState<string | undefined>(
		defaultValue
	);
	const [expanded, setExpanded] = useState(false);

	function toggleExpanded() {
		setExpanded(prevExpanded => !prevExpanded);
	}

	function onSelect(value: string) {
		setSelectedValue(value);

		onChange(value);
	}

	const ctxValue: ISelectContext = {
		onSelect,
		selectedValue,
		expanded,
		toggleExpanded,
		getSelectedOptionContent,
	};

	return (
		<SelectContext.Provider value={ctxValue}>{children}</SelectContext.Provider>
	);
};

export default SelectProvider;
