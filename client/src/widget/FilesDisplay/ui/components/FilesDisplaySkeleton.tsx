import type { FC } from "react";

import Container from "@/shared/ui/components/Container";
import SkeletonField from "@/shared/ui/components/SkeletonField/SkeletonField";
import repeat from "@/shared/lib/helper/repeat";

const FilesDisplaySkeleton: FC = () => {
	return (
		<Container variants={{ color: "transparent" }} className='rounded-md'>
			<section className='flex flex-col gap-2'>
				<header>
					<p className='text-xl'>
						<SkeletonField />
					</p>
				</header>
				<div className='flex gap-1'>
					{repeat(4, index => (
						<SkeletonField
							key={index}
							className='block h-12 flex-1 rounded-md'
						/>
					))}
				</div>
				<div className='flex flex-col gap-1'>
					{repeat(10, index => (
						<SkeletonField key={index} className='block h-6 rounded-md' />
					))}
				</div>
			</section>
		</Container>
	);
};

export default FilesDisplaySkeleton;
