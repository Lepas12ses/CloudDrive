import type { FC } from "react";
import Button from "../shared/Button";
import useHeader from "./useHeader";

import classes from "./Header.module.scss";
import NavigationLink from "../shared/NavigationLink";

const Header: FC = () => {
	const { onLogout } = useHeader();

	return (
		<>
			<header
				className={`bg-stone-200 border-b border-b-stone-400 px-5 py-2 flex justify-between items-center ${classes.highlight}`}
			>
				<nav className={`flex gap-3 `}>
					<NavigationLink to='/'>Домашняя</NavigationLink>
					<NavigationLink to='/profile'>Профиль</NavigationLink>
				</nav>

				<nav>
					<Button
						onClick={onLogout}
						variants={{ size: "xs" }}
						className='rounded'
					>
						Выйти
					</Button>
				</nav>
			</header>
		</>
	);
};

export default Header;
