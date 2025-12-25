import type { ComponentProps, FC } from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationLink.module.scss";

const NavigationLink: FC<ComponentProps<typeof NavLink>> = ({
	children,
	...props
}) => {
	return (
		<NavLink
			{...props}
			className={({ isActive }) =>
				`${classes.link} ${isActive ? classes["link_active"] : ``}`
			}
		>
			{children}
		</NavLink>
	);
};

export default NavigationLink;
