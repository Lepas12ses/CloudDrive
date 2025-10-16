import { type FC } from "react";
import { Outlet } from "react-router-dom";
import HomeMenu from "@/components/HomeMenu.tsx";

const HomeLayoutPage: FC = () => {
	return (
		<>
			<HomeMenu />
			<main className='w-10 h-screen bg-blue-600 flex-1'>
				<Outlet />
			</main>
		</>
	);
};

export default HomeLayoutPage;
