import { createContext, useContext } from "react";

export interface ISelectContext {
	onSelect: (value: string) => void;
	selectedValue?: string;
	expanded: boolean;
	toggleExpanded: () => void;
	getSelectedOptionContent: (value: string) => string;
}

export const SelectContext = createContext<ISelectContext | null>(null);

export default function useSelectContext() {
	const context = useContext(SelectContext);

	if (!context) {
		throw new Error(
			"You cannot use SelectContext outside SelectProvider component"
		);
	}

	return context;
}
