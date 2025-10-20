import {
	createContext,
	useContext,
	useState,
	type FC,
	type PropsWithChildren,
} from "react";

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

	const classes = `z-20 flex flex-col w-20 h-screen py-4 px-2 border-r-2 border-stone-200 rounded-r-md bg-stone-100 fixed left-0 shadow-md transition-all ${
		isExpanded ? expandedClasses : ""
	}`;

	return (
		<MenuContext.Provider value={ctxValue}>
			<menu className={classes}>
				<MenuButton onClick={toggleExpand} expandedContent='Скрыть меню'>
					<img src={menuIcon} alt='Home icon' />
				</MenuButton>
				{children}
			</menu>
		</MenuContext.Provider>
	);
};

export default Menu;
