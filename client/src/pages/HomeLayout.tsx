import { type FC } from "react";
import { Outlet } from "react-router-dom";

import Header from "@/components/Header/Header";

const HomeLayoutPage: FC = () => {
	return (
		<>
			<Header />
			<main className='p-3 min-h-screen flex-1'>
				<Outlet />
			</main>
		</>
	);
};

export default HomeLayoutPage;
