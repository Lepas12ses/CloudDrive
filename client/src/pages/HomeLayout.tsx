import { type FC } from "react";
import { Outlet } from "react-router-dom";

import Header from "@/components/Header/Header";

const HomeLayoutPage: FC = () => {
	return (
		<>
			<div className=' h-screen overflow-hidden'>
				<Header />
				<main className='p-3'>
					<Outlet />
				</main>
			</div>
		</>
	);
};

export default HomeLayoutPage;
