import { Sequelize } from "sequelize";

import models from "../models/index.js";

class DatabaseService {
	sequelize: Sequelize | null;

	private POSTGRES_DB = process.env.POSTGRES_DB;
	private POSTGRES_HOST = process.env.POSTGRES_HOST;
	private POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT);
	private POSTGRES_USER = process.env.POSTGRES_USER;
	private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

	async connect() {
		console.log(`Connecting to PostgreSQL db with params: 
            DB=${this.POSTGRES_DB}
            HOST=${this.POSTGRES_HOST}
            PORT=${this.POSTGRES_PORT}
            USER=${this.POSTGRES_USER}
            PASSWORD=${this.POSTGRES_PASSWORD}
            `);

		this.sequelize = new Sequelize({
			database: this.POSTGRES_DB,
			host: this.POSTGRES_HOST,
			port: this.POSTGRES_PORT,
			username: this.POSTGRES_USER,
			password: this.POSTGRES_PASSWORD,
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
