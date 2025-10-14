import type { FC } from "react";
import { Outlet } from "react-router-dom";

const HomeLayoutPage: FC = () => {
	return (
		<>
			<header>Какой то хэдер</header>
			<Outlet />
		</>
	);
};

export default HomeLayoutPage;
