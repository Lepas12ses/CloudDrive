import { createContext, useContext } from "react";
import type FieldError from "../model/FieldError";

export interface IFieldContext {
	id: string;
	error?: FieldError;
}

export const FieldContext = createContext<IFieldContext | null>(null);

export default function useFieldContext() {
	const context = useContext(FieldContext);

	if (!context) {
		throw new Error(
			"You cannot use FieldContext outside FieldProvider component"
		);
	}

	return context;
}
