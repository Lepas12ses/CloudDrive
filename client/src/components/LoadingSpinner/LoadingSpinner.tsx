import type { FC } from "react";

import classes from "./LoadingSpinner.module.css";

interface LoadingProps {
	className?: string;
}

const LoadingSpinner: FC<LoadingProps> = ({ className = "w-20" }) => {
	return (
		<div className={`${classes.spinner} ${className}`}>
			<div className={`${classes.line} ${classes.outer}`}></div>
			<div className={`${classes.line} ${classes.middle}`}></div>
			<div className={`${classes.line} ${classes.inner}`}></div>
		</div>
	);
};

export default LoadingSpinner;
