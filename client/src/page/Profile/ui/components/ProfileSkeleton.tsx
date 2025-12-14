import SkeletonField from "@/shared/ui/components/SkeletonField/SkeletonField";
import type { FC } from "react";

const ProfileSkeleton: FC = () => {
	return (
		<div>
			<p>
				<SkeletonField />
			</p>
			<p>
				<SkeletonField />
			</p>
		</div>
	);
};

export default ProfileSkeleton;
