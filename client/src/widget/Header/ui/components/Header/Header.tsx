import type { FC } from "react";

import Button from "@/shared/ui/components/Button";
import useHeader from "../../../lib/hooks/useHeader";
import classes from "./Header.module.scss";
import Navigation from "../Navigation/Navigation";

const Header: FC = () => {
	const { onLogout } = useHeader();

	return (
		<>
			<header
				className={`
					sticky bg-stone-200 border-b 
					border-b-stone-400 px-5 py-2 
					flex justify-between items-center 
					top-0 z-20
					${classes.highlight}
					`}
			>
				<Navigation />

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
