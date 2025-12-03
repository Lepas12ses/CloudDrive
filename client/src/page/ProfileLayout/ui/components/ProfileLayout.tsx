import type { FC } from "react";
import { Outlet } from "react-router-dom";

const ProfileLayout: FC = () => {
	return (
		<div className=' flex flex-col items-center pt-15'>
			<div className='min-w-100'>
				<p>С возвращением!</p>
				<div className='pt-5 mt-5 border-t border-t-(--border)'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default ProfileLayout;
