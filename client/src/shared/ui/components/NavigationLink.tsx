import type { ComponentProps, FC } from "react";
import { Link, NavLink } from "react-router-dom";

const NavigationLink: FC<ComponentProps<typeof Link>> = ({
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
