import { type FC } from "react";

import { Outlet } from "react-router-dom";
import useProtected from "@/hooks/useProtected";
import Menu from "@/components/Menu";
import MenuLink from "@/components/Menu/MenuLink";
import homeIcon from "@/assets/icons/home.svg";
import profileIcon from "@/assets/icons/profile.svg";

const HomeLayoutPage: FC = () => {
	useProtected();

	return (
		<>
			<Menu>
				<div className='flex flex-col gap-2 mt-4 pt-4 border-t-2 border-stone-300 border-dotted'>
					<MenuLink to='/' expandedContent='Главная'>
						<img src={homeIcon} alt='Home icon' />
					</MenuLink>
					<MenuLink to='/profile' expandedContent='Профиль'>
						<img src={profileIcon} alt='Home icon' />
					</MenuLink>
				</div>
			</Menu>
			<main className='w-10 h-screen bg-blue-600 flex-1'>
				<Outlet />
			</main>
		</>
	);
};

export default HomeLayoutPage;
