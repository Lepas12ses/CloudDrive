import { useState, type FC, type PropsWithChildren } from "react";
import { FormContext, type IFormContext } from "./FormContext";
import type Validator from "./model/Validator";

import type { FieldErrors } from "./model/FieldErrors";
import type FieldError from "./model/FieldError";
import type { Fields } from "./model/Fields";

function getFields(fd: FormData): Fields {
	return new Map(fd.entries());
}

function getFieldErrors(validators: Validator[], fields: Fields): FieldErrors {
	const errors: FieldErrors = new Map<string, FieldError>();
	validators.forEach(validator => {
		if (validator.valid(fields)) return;

		const { field, failMessage: message } = validator;

		const error = errors.get(field);
		if (error) {
			error.messages.push(message);
			return;
		}

		errors.set(field, { messages: [message] });
	});
	return errors;
}

function mergeErrors(
	errors1: FieldErrors | null = null,
	errors2: FieldErrors | null = null
): FieldErrors | null {
	if (!errors1) {
		return errors2;
	}
	if (!errors2) {
		return errors1;
	}
	const result: FieldErrors = new Map(errors1);

	for (const entry of errors2.entries()) {
		const fieldError = result.get(entry[0]);
		if (fieldError) {
			fieldError.messages.push(...entry[1].messages);
			continue;
		}
		result.set(...entry);
	}

	return result;
}

interface FromProviderProps extends PropsWithChildren {
	onSubmit: (fd: FormData) => void;
	validators?: Validator[];
	errors?: FieldErrors;
	formError?: string | null;
}

const FormProvider: FC<FromProviderProps> = ({
	children,
	onSubmit,
	validators = [],
	errors = null,
	formError = null,
}) => {
	const [fieldErrors, setFieldErrors] = useState<FieldErrors | null>();
	const [showUserErrors, setShowUserErrors] = useState(false);

	function validateAndSubmit(fd: FormData) {
		const fields = getFields(fd);

		const errors = getFieldErrors(validators, fields);

		if (errors.size) {
			setShowUserErrors(false);
			setFieldErrors(errors);
			return;
		}

		setShowUserErrors(true);
		setFieldErrors(null);
		onSubmit(fd);
	}

	const ctx: IFormContext = {
		onSubmit: validateAndSubmit,
		fieldErrors: showUserErrors
			? mergeErrors(errors, fieldErrors)
			: fieldErrors,
		formError: showUserErrors ? formError : null,
	};

	return <FormContext.Provider value={ctx}>{children}</FormContext.Provider>;
};

export default FormProvider;
