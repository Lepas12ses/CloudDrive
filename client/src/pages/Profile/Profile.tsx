import { type FC } from "react";
import useProfile from "./useProfile";
import LoadingSpinner from "@/components/LoadingSpinner";

const ProfilePage: FC = () => {
	const { data, isError, error, isPending } = useProfile();

	let content: React.ReactElement | null = null;

	if (data) {
		content = (
			<div>
				<p>
					Логин: <span className='font-bold'>{data.login}</span>
				</p>
				<p>
					Почта: <span className='font-bold'>{data.email}</span>
				</p>
			</div>
		);
	}

	return <LoadingSpinner />;
};

export default ProfilePage;
