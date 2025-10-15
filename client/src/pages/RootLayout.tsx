import type { FC } from "react";
import { Outlet } from "react-router-dom";

const RootLayoutPage: FC = () => {
	return (
		<>
			<Outlet />
		</>
	);
};

export default RootLayoutPage;
