// import Model from "./Model";
import { DataTypes, Model } from "sequelize";
import Database from "../utils/database";

class User extends Model {}

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
		}
	},
	{
		tableName: "users",
		// Other model options go here
		sequelize: Database.stcSequelize, // We need to pass the connection instance
		modelName: "User" // We need to choose the model name
	}
);

User.sync();

export default User;
