import { useEffect, type FC, type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/shared/lib/store/hooks/useAppSelector";
import authStateSelector from "@/shared/lib/store/selectors/authStateSelector";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
	const { token } = useAppSelector(authStateSelector);
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate("/sign-in", { replace: true });
		}
	}, [token, navigate]);

	if (!token) return;

	return children;
};

export default ProtectedRoute;
