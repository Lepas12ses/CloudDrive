import { useCallback, useEffect, useState, type FC } from "react";

import NavigationLink from "@/shared/ui/components/NavigationLink";
import classes from "./Navigation.module.scss";
import useBreakpoint from "@/shared/lib/hooks/useBreakpoint";
import useClickOutside from "@/shared/lib/hooks/useClickOutside";

const Navigation: FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const isScreenSmall = useBreakpoint(null, 639);

	const handleBurgerClick = useCallback(() => {
		setIsMenuOpen(prev => !prev);
	}, []);

	const handleMenuClose = useCallback(() => {
		setIsMenuOpen(false);
	}, []);

	const menuRef = useClickOutside<HTMLDivElement>(handleMenuClose);

	useEffect(() => {
		if (!isScreenSmall) {
			handleMenuClose();
		}
	}, [handleMenuClose, isScreenSmall]);

	return (
		<>
			<nav className={`hidden gap-3 sm:flex`}>
				<NavigationLink to='/'>Домашняя</NavigationLink>
				<NavigationLink to='/profile'>Профиль</NavigationLink>
			</nav>
			<div className={`${classes["burger-wrapper"]}`} ref={menuRef}>
				<button
					className={`relative sm:hidden ${classes["burger-btn"]} ${
						isMenuOpen ? classes["burger-btn_close"] : ""
					}`}
					onClick={handleBurgerClick}
				>
					<span></span>
					<span></span>
					<span></span>
				</button>
				<nav
					className={`sm:hidden ${classes["burger-menu"]} ${
						isMenuOpen ? classes["burger-menu_open"] : ""
					}`}
				>
					<NavigationLink to='/' onClick={handleMenuClose}>
						Домашняя
					</NavigationLink>
					<NavigationLink to='/profile' onClick={handleMenuClose}>
						Профиль
					</NavigationLink>
				</nav>
			</div>
		</>
	);
};

export default Navigation;
