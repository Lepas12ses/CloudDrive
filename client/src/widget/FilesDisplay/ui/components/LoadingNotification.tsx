import type { FC, PropsWithChildren } from "react";

import Container from "@/shared/ui/components/Container";
import LoadingSpinner from "@/shared/ui/components/LoadingSpinner/LoadingSpinner";
import Notification from "@/shared/ui/components/Notification";

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
