import AuthenticationProvider from "@/components/AuthenticationProvider";
import type { FC } from "react";
import { Outlet } from "react-router-dom";

const RootLayoutPage: FC = () => {
	return (
		<AuthenticationProvider>
			<Outlet />
		</AuthenticationProvider>
	);
};

export default RootLayoutPage;
