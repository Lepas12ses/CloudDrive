import { type FC } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "@/widget/Header";

const HomeLayout: FC = () => {
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

export default HomeLayout;
