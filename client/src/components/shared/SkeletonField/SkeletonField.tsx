import type { FC } from "react";

import classes from "./SkeletonField.module.css";
import cn from "@/util/cn";

interface SkeletonFieldProps {
	className?: string;
}

const SkeletonField: FC<SkeletonFieldProps> = ({ className }) => {
	return (
		<span
			className={cn(classes.skeleton, className ? className : classes.default)}
		></span>
	);
};

export default SkeletonField;
