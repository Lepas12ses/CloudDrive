function getString(name: string, asserts: boolean = false): string | undefined {
	const value = process.env[name];

	if (asserts && value === undefined)
		throw new Error(`Environment variable with name ${name} not found`);

	return process.env[name];
}

function getNumber(name: string, asserts: boolean = false): number | undefined {
	const value = getString(name, asserts);

	return value !== undefined ? parseInt(value) : undefined;
}

class Env {
	port: number;
	clientUrl: string;
	dbName: string;
	dbHost: string;
	dbPort: number;
	dbUser: string;
	dbPassword: string;
	jwtAccessSecret: string;
	jwtRefreshSecret: string;

	constructor() {
		this.port = getNumber("PORT") ?? 8000;
		this.clientUrl = getString("CLIENT_URL", true);
		this.dbName = getString("POSTGRES_DB", true);
		this.dbHost = getString("POSTGRES_HOST", true);
		this.dbPort = getNumber("POSTGRES_PORT", true);
		this.dbUser = getString("POSTGRES_USER", true);
		this.dbPassword = getString("POSTGRES_USER", true);
		this.jwtAccessSecret = getString("JWT_ACCESS_SECRET", true);
		this.jwtRefreshSecret = getString("JWT_REFRESH_SECRET", true);
	}
}

const env = new Env();

export default env;
