import { createContext, useContext, type FC, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "@/util/cn";

interface IInputContext {
	id: string;
}

const InputContext = createContext<IInputContext | null>(null);

export function useInputContext() {
	const context = useContext(InputContext);

	if (!context) {
		throw new Error("You must use InputContext only inside Input component");
	}

	return context;
}

const input = cva("flex gap-1", {
	variants: {
		direction: {
			col: "flex-col",
			row: "flex-row",
		},
	},
	defaultVariants: {
		direction: "col",
	},
});

interface InputProps extends HTMLAttributes<HTMLDivElement> {
	id: string;
	variants?: VariantProps<typeof input>;
}

const Input: FC<InputProps> = ({
	children,
	id,
	variants,
	className,
	...props
}) => {
	const classes = cn(input({ ...variants, className }));

	const ctxValue: IInputContext = {
		id,
	};

	return (
		<InputContext.Provider value={ctxValue}>
			<div {...props} className={classes}>
				{children}
			</div>
		</InputContext.Provider>
	);
};

export default Input;
