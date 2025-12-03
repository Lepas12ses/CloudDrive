import type { FC } from "react";
import { Outlet } from "react-router-dom";

import AuthenticationProvider from "@/entity/AuthenticationProvider";

const RootLayout: FC = () => {
	return (
		<AuthenticationProvider>
			<Outlet />
		</AuthenticationProvider>
	);
};

export default RootLayout;
