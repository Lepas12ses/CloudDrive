import type { FC, PropsWithChildren } from "react";
import useSelectContext from "./SelectContext";

const Options: FC<PropsWithChildren> = ({ children }) => {
	const { expanded } = useSelectContext();

	if (expanded) return children;
};

export default Options;
