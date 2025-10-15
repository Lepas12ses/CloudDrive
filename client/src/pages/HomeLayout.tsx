import Button from "@/components/Button";
import authService from "@/service/AuthService";
import { useAppDispatch } from "@/store";
import { type FC } from "react";

import { Outlet } from "react-router-dom";
import { actions as authActions } from "@/store/auth";
import api from "@/http";
import useProtected from "@/hooks/useProtected";

const HomeLayoutPage: FC = () => {
	useProtected();
	const dispatch = useAppDispatch();

	async function logout() {
		await authService.logout();
		dispatch(authActions.setToken(null));
	}

	async function test() {
		const response = await api.get<{ message: string }>("user/hello");
		console.log(response.data.message);
	}

	return (
		<>
			<header>Какой то хэдер</header>
			<Button onClick={logout}>Выйти</Button>
			<Button onClick={test}>Тест</Button>

			<Outlet />
		</>
	);
};

export default HomeLayoutPage;
