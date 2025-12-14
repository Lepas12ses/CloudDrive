import { lazy, Suspense, type FC } from "react";
import ProfileSkeleton from "./ProfileSkeleton";

const Component = lazy(() => import("./Profile"));

const ProfileLazy: FC = () => {
	return (
		<Suspense fallback={<ProfileSkeleton />}>
			<Component />
		</Suspense>
	);
};

export default ProfileLazy;
