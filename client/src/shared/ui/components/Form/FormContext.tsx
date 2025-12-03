import { createContext, useContext } from "react";
import type { FieldErrors } from "./model/FieldErrors";

export interface IFormContext {
	onSubmit: (fd: FormData) => void;
	fieldErrors?: FieldErrors | null;
	formError?: string | null;
}

export const FormContext = createContext<IFormContext | null>(null);

export default function useFormContext() {
	const context = useContext(FormContext);

	if (!context) {
		throw new Error(
			"You cannot use FormContext outside FormProvider component"
		);
	}

	return context;
}
