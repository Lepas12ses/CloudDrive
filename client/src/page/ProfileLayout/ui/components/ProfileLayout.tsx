import Container from "@/shared/ui/components/Container";
import NavigationLink from "@/shared/ui/components/NavigationLink";
import type { FC } from "react";
import { Outlet } from "react-router-dom";

const ProfileLayout: FC = () => {
	return (
		<div className='flex gap-3 justify-center pt-15'>
			<Container className='rounded-md'>
				<menu className='flex flex-col gap-1'>
					<NavigationLink to={""} end>
						Личные данные
					</NavigationLink>
					<NavigationLink to={"sessions"} end>
						Активные сеансы
					</NavigationLink>
				</menu>
			</Container>
			<div className='min-w-100'>
				<Outlet />
			</div>
		</div>
	);
};

export default ProfileLayout;
