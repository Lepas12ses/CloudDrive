import type { FC } from "react";
import useFormContext from "./FormContext";

const FormError: FC = () => {
	const { formError } = useFormContext();

	if (formError)
		return (
			<p className="'bg-red-200 text-red-800 font-bold rounded-md py-1 px-2'">
				{formError}
			</p>
		);
};

export default FormError;
