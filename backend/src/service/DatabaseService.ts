import { Sequelize } from "sequelize";

import models from "#src/model/schema/index.js";
import env from "../shared/lib/env.js";

class DatabaseService {
	sequelize: Sequelize | null;

	async connect() {
		const name = env.dbName;
		const host = env.dbHost;
		const port = env.dbPort;
		const user = env.dbUser;
		const password = env.dbPassword;

		console.log(`Connecting to PostgreSQL db with params: 
            DB=${name}
            HOST=${host}
            PORT=${port}
            USER=${user}
            PASSWORD=${password}
            `);

		this.sequelize = new Sequelize({
			database: name,
			host: host,
			port: port,
			username: user,
			password: password,
			dialect: "postgres",
			logging: false,
		});

		await this.sequelize
			.authenticate()
			.then(() => console.log("Подключение с базой данных установлено"))
			.catch(err =>
				console.error(`Не удалось подключиться к базе данных (${err})`)
			);

		this.initModels();

		await this.sequelize.sync();
	}

	private initModels() {
		models.forEach(initModel => initModel(this.sequelize));
	}
}

const databaseService = new DatabaseService();

export default databaseService;
