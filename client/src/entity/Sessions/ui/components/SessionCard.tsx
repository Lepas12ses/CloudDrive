import type { FC } from "react";
import type Session from "../../model/Session";
import Container from "@/shared/ui/components/Container";

interface SessionCardProps {
	session: Session;
}

const SessionCard: FC<SessionCardProps> = ({ session }) => {
	const loginTime = new Date(session.creationTime);

	return (
		<Container
			className={`
            rounded-lg flex flex-col border 
            border-(--border)
            `}
		>
			<p>IP: {session.deviceInfo.ip}</p>
			<p>Устройство: {session.deviceInfo.name}</p>
			<p>Последний вход: {loginTime.toLocaleString("ru")}</p>
		</Container>
	);
};

export default SessionCard;
