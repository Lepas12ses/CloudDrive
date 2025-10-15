import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/store";

export default function useProtected(navigateTo: string = "/auth/sign-in") {
	const { token } = useAppSelector(state => state.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate(navigateTo);
		}
	}, [navigate, token, navigateTo]);
}
