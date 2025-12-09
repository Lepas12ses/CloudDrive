import type { FC } from "react";

import Container from "@/shared/ui/components/Container";
import { SessionCard, useSessionsQuery } from "@/entity/Sessions";
import ErrorDisplay from "@/shared/ui/components/ErrorDisplay";
import LoadingSpinner from "@/shared/ui/components/LoadingSpinner/LoadingSpinner";

const Sessions: FC = () => {
	const { data, isError, error, isPending } = useSessionsQuery();

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
				variants={{ color: "normal" }}
				className='w-full rounded-lg flex flex-col gap-1.5'
			>
				{data.sessions.map(session => (
					<SessionCard key={session.id} session={session} />
				))}
			</Container>
		);
	}
};

export default Sessions;
