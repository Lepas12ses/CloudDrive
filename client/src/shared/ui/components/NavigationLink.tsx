import type { ComponentProps, FC } from "react";
import { NavLink } from "react-router-dom";

const NavigationLink: FC<ComponentProps<typeof NavLink>> = ({
	children,
	...props
}) => {
	return (
		<NavLink
			{...props}
			className={({ isActive }) =>
				`hover:opacity-70 ${isActive ? `underline` : ``}`
			}
		>
			{children}
		</NavLink>
	);
};

export default NavigationLink;
