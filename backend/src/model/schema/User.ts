import { DataTypes, Model, Sequelize } from "sequelize";

export default class User extends Model {
	declare id?: number;
	declare email: string;
	declare password: string;
	declare login: string;
}

export function init(sequelize: Sequelize) {
	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			login: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: true,
				},
			},
		},
		{
			sequelize,
			timestamps: false,
		}
	);
}
