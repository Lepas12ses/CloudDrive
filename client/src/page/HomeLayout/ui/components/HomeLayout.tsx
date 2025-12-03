import { type FC } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "@/widget/Header";

const HomeLayout: FC = () => {
	return (
		<>
			<div>
				<Header />
				<main className='p-3'>
					<Outlet />
				</main>
			</div>
		</>
	);
};

export default HomeLayout;
