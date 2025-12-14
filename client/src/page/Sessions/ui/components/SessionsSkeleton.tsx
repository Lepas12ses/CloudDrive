import repeat from "@/shared/lib/helper/repeat";
import SkeletonField from "@/shared/ui/components/SkeletonField/SkeletonField";
import type { FC } from "react";

const SessionsSkeleton: FC = () => {
	return (
		<div className='flex flex-col gap-1.5 w-150'>
			{repeat(3, index => (
				<SkeletonField key={index} className='block w-full h-25 rounded-md' />
			))}
		</div>
	);
};

export default SessionsSkeleton;
