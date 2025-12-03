import { type FC } from "react";

import useProfile from "../../lib/hooks/useProfile";
import LoadingSpinner from "@/shared/ui/components/LoadingSpinner/LoadingSpinner";
import ErrorDisplay from "@/shared/ui/components/ErrorDisplay";
import Container from "@/shared/ui/components/Container";

const Profile: FC = () => {
	const { data, isError, error, isPending } = useProfile();

	if (isError) {
		return (
			<ErrorDisplay
				title='Возникла ошибка'
				message={error?.message || "Что-то пошло не так"}
				className='m-auto'
			/>
		);
	}

	if (isPending) {
		return <LoadingSpinner className='m-auto w-20' />;
	}

	if (data) {
		return (
			<Container
				variants={{ shadow: "l", color: "light" }}
				className='w-fit rounded-lg'
			>
				<p>
					Логин:<span className='font-bold'>{data.login}</span>
				</p>
				<p>
					Почта: <span className='font-bold'>{data.email}</span>
				</p>
			</Container>
		);
	}
};

export default Profile;
