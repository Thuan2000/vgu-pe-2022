// import Model from "./Model";
import { DataTypes, Model } from "sequelize";
import Database from "../utils/database";
import Roles from "./Roles";

export default class User extends Model {}

User.init(
	{
		// Model attributes are defined here
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		token: {
			type: DataTypes.STRING
		},
		approved: {
			type: DataTypes.BOOLEAN
		},
		// @foreign key of roles name
		role: {
			type: DataTypes.INTEGER
		}
	},
	{
		tableName: "users",
		// Other model options go here
		sequelize: Database.stcSequelize, // We need to pass the connection instance
		modelName: "User" // We need to choose the model name
	}
);
