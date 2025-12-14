import { lazy, Suspense } from "react";
import type { FC } from "react";
import HomeSkeleton from "./HomeSkeleton";

const Component = lazy(() => import("./Home"));

const HomeLazy: FC = () => {
	return (
		<Suspense fallback={<HomeSkeleton />}>
			<Component />
		</Suspense>
	);
};

export default HomeLazy;
