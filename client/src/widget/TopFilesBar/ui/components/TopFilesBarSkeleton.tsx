import SkeletonField from "@/shared/ui/components/SkeletonField/SkeletonField";
import { memo, type FC } from "react";

const TopFilesBarSkeleton: FC = memo(() => {
	return <SkeletonField className='w-full h-15 rounded-md shadow-s' />;
});

export default TopFilesBarSkeleton;
