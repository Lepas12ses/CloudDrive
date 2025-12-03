import type { FC } from "react";

import cn from "@/shared/lib/helper/cn";
import classes from "./SkeletonField.module.scss";

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
