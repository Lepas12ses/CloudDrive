export default function getExpirationTime(days: number) {
	const now = new Date();
	const expiration = new Date(now);
	expiration.setDate(now.getDate() + days);
	return expiration;
}
