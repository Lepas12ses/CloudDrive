import { DataTypes, Model, Sequelize } from "sequelize";
import User from "./User.js";

export default class Token extends Model {
	declare id?: number;
	declare userId: number;
	declare refreshToken: string;
}

export function init(sequelize: Sequelize) {
	Token.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: User,
					key: "id",
				},
			},
			refreshToken: {
				type: DataTypes.STRING,
				allowNull: false,
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
