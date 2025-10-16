import { DataTypes, Model, Sequelize } from "sequelize";
import User from "./User.js";

export default class File extends Model {
	declare id?: number;
	declare originalName: string;
	declare name: string;
	declare size: number;
	declare userId: number;
}

export function init(sequelize: Sequelize) {
	File.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			originalName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			size: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: User,
					key: "id",
				},
			},
		},
		{
			sequelize,
		}
	);
}
