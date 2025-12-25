import type { FC } from "react";

import Button from "@/shared/ui/components/Button";
import useHeader from "../../../lib/hooks/useHeader";
import Navigation from "../Navigation/Navigation";

const Header: FC = () => {
	const { onLogout } = useHeader();

	return (
		<>
			<header
				className={`
					sticky bg-(--bg) border-b 
					border-b-(--border) px-5 py-2 
					flex justify-between items-center 
					top-0 z-20
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
