import { type FC, type PropsWithChildren } from "react";

import useCheckAuth from "./hooks/useCheckAuth";
import useAuthorizationInterceptor from "./hooks/useAuthorizationInterceptor";
import useRefreshInterceptor from "./hooks/useRefreshInterceptor";

const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
	const { isLoading } = useCheckAuth();

	useAuthorizationInterceptor();

	useRefreshInterceptor();

	return <>{isLoading ? null : children}</>;
};

export default AuthenticationProvider;
