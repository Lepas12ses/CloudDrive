import type { FC, PropsWithChildren } from "react";
import useFormContext from "../FormContext";
import { FieldContext, type IFieldContext } from "./FieldContext";

interface FieldProviderProps extends PropsWithChildren {
	id: string;
}

const FieldProvider: FC<FieldProviderProps> = ({ children, id }) => {
	const { fieldErrors } = useFormContext();
	const error = fieldErrors?.get(id);

	const ctx: IFieldContext = {
		id,
		error,
	};

	return <FieldContext.Provider value={ctx}>{children}</FieldContext.Provider>;
};

export default FieldProvider;
