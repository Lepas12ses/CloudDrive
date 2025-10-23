import type { Fields } from "./Fields";

export default interface Validator {
	field: string;
	valid: (fields: Fields) => boolean;
	failMessage: string;
}
