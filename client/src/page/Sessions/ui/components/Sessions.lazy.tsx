import { lazy, Suspense, type FC } from "react";

import SessionsSkeleton from "./SessionsSkeleton";

const Component = lazy(() => import("./Sessions"));

const SessionsLazy: FC = () => {
	return (
		<Suspense fallback={<SessionsSkeleton />}>
			<Component />
		</Suspense>
	);
};

export default SessionsLazy;
