import type { FC, ReactNode } from "react";

import LoadingSpinner from "@/shared/ui/components/LoadingSpinner/LoadingSpinner";
import useAuthorizationInterceptor from "../../lib/hooks/useAuthorizationInterceptor";
import useAuthenticationCheck from "../../lib/hooks/useAuthenticationCheck";
import useRefreshInterceptor from "../../lib/hooks/useRefreshInterceptor";

interface AuthenticationProviderProps {
	children: ReactNode;
	fallback?: ReactNode;
}

const AuthenticationProvider: FC<AuthenticationProviderProps> = ({
	children,
	fallback = <LoadingSpinner />,
}) => {
	const { isLoading } = useAuthenticationCheck();

	useAuthorizationInterceptor();

	useRefreshInterceptor();

	if (isLoading) return fallback;

	return <>{isLoading ? null : children}</>;
};

export default AuthenticationProvider;
