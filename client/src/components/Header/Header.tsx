import type { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../shared/Button";
import useHeader from "./useHeader";

const Header: FC = () => {
	const { onLogout } = useHeader();

	return (
		<header
			className={`bg-stone-100 px-5 py-2 flex justify-between items-center`}
		>
			<nav className={`flex gap-3 `}>
				<Link to='/'>Домой</Link>
				<Link to='/profile'>Профиль</Link>
			</nav>
			<nav>
				<Button
					onClick={onLogout}
					variants={{ size: "xs" }}
					className='rounded-md'
				>
					Выйти
				</Button>
			</nav>
		</header>
	);
};

export default Header;
