import { type FC } from "react";
import { Outlet } from "react-router-dom";
import HomeMenu from "@/components/HomeMenu";

const HomeLayoutPage: FC = () => {
	return (
		<>
			<HomeMenu />
			<main className=' ml-20 p-3 min-h-screen flex-1'>
				<Outlet />
			</main>
		</>
	);
};

export default HomeLayoutPage;
