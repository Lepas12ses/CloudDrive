import {
	createContext,
	useContext,
	useState,
	type FC,
	type PropsWithChildren,
} from "react";

import logoutIcon from "@/assets/icons/logout.svg";
import menuIcon from "@/assets/icons/menu.svg";
import MenuButton from "./MenuButton";

interface IMenuContext {
	isExpanded: boolean;
}

const MenuContext = createContext<IMenuContext | null>(null);

export function useMenuContext() {
	const context = useContext(MenuContext);

	if (!context) throw new Error("Use MenuContext only inside menu component");

	return context;
}

const Menu: FC<PropsWithChildren> = ({ children }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	function toggleExpand() {
		setIsExpanded(prevExpanded => !prevExpanded);
	}

	const ctxValue = {
		isExpanded,
	};

	const expandedClasses = "w-60 transition-all";

	const classes = `flex flex-col w-20 h-screen py-4 px-2 border-r-2 border-stone-200 rounded-r-md bg-stone-100 fixed left-0 shadow-md transition-all ${
		isExpanded ? expandedClasses : ""
	}`;

	return (
		<MenuContext.Provider value={ctxValue}>
			<menu className={classes}>
				<MenuButton onClick={toggleExpand} expandedContent='Скрыть меню'>
					<img src={menuIcon} alt='Home icon' />
				</MenuButton>
				{children}
				<div className='mt-auto flex flex-col'>
					<MenuButton expandedContent='Выйти'>
						<img src={logoutIcon} alt='Home icon' />
					</MenuButton>
				</div>
			</menu>
		</MenuContext.Provider>
	);
};

export default Menu;

{
	/* <div className='mt-4 pt-4 border-t-2 border-dotted border-stone-300 flex flex-col gap-2'>
	<NavLink
		to='/'
		className='bg-stone-50 shadow-md w-fit p-3 mx-auto rounded-lg border-stone-300 border hover:bg-stone-200'
	>
		<img src={homeIcon} alt='Home icon' />
	</NavLink>
	<NavLink
		to='/profile'
		className='bg-stone-50 shadow-md w-fit p-3 mx-auto rounded-lg border-stone-300 border hover:bg-stone-200'
	>
		<img src={profileIcon} alt='Person icon' />
	</NavLink>
</div>; */
}
