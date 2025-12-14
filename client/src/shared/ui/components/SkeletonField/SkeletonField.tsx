import type { FC, PropsWithChildren } from "react";

import cn from "@/shared/lib/helper/cn";
import classes from "./SkeletonField.module.scss";

interface SkeletonFieldProps extends PropsWithChildren {
	className?: string;
}

const SkeletonField: FC<SkeletonFieldProps> = ({ className, children }) => {
	return (
		<span
			className={cn(classes.skeleton, className ? className : classes.default)}
		>
			{children}
		</span>
	);
};

export default SkeletonField;
