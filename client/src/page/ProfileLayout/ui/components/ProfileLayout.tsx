import type { FC } from "react";
import { Outlet } from "react-router-dom";

const ProfileLayout: FC = () => {
	return (
		<div className=' flex flex-col items-center pt-15'>
			<div className='min-w-100'>
				<Outlet />
			</div>
		</div>
	);
};

export default ProfileLayout;
