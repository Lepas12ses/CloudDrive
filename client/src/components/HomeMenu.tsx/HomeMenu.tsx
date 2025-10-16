import type { FC } from "react";

import homeIcon from "@/assets/icons/home.svg";
import logoutIcon from "@/assets/icons/logout.svg";
import profileIcon from "@/assets/icons/profile.svg";
import Menu from "@/components/Menu";
import MenuLink from "@/components/Menu/MenuLink";
import MenuButton from "@/components/Menu/MenuButton";
import useHomeMenu from "./useHomeMenu";

const HomeMenu: FC = () => {
	const { onLogout } = useHomeMenu();

	return (
		<Menu>
			<div className='flex flex-col gap-2 mt-4 pt-4 border-t-2 border-stone-300 border-dotted'>
				<MenuLink to='/' expandedContent='Главная'>
					<img src={homeIcon} alt='Home icon' />
				</MenuLink>
				<MenuLink to='/profile' expandedContent='Профиль'>
					<img src={profileIcon} alt='Home icon' />
				</MenuLink>
			</div>
			<div className='mt-auto flex flex-col'>
				<MenuButton onClick={onLogout} expandedContent='Выйти'>
					<img src={logoutIcon} alt='Home icon' />
				</MenuButton>
			</div>
		</Menu>
	);
};

export default HomeMenu;
