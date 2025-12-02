import { type FC } from "react";
import useProfile from "../../lib/hooks/useProfile";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
import Container from "@/components/shared/Container";

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
