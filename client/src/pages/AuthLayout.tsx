import { type FC } from "react";
import { Outlet } from "react-router-dom";

const AuthLayoutPage: FC = () => {
	return (
		<div className='min-h-screen flex items-center justify-center'>
			<Outlet />
		</div>
	);
};

export default AuthLayoutPage;
