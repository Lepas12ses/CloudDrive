import Container from "@/components/shared/Container";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Notification from "@/components/shared/Notification";
import type { FC, PropsWithChildren } from "react";

const LoadingNotification: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Notification>
			<Container
				variants={{ shadow: "m" }}
				className='flex gap-1.5 items-center rounded-md'
			>
				<LoadingSpinner />
				<p>{children}</p>
			</Container>
		</Notification>
	);
};

export default LoadingNotification;
