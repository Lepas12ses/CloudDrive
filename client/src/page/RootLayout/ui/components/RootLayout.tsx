import AuthenticationProvider from "@/components/AuthenticationProvider";
import type { FC } from "react";
import { Outlet } from "react-router-dom";

const RootLayout: FC = () => {
	return (
		<AuthenticationProvider>
			<Outlet />
		</AuthenticationProvider>
	);
};

export default RootLayout;
