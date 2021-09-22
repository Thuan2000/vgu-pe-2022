import { DataTypes, Model } from "sequelize";
import Database from "../services/database.service";
import User from "./User";
export default class Roles extends Model {}

Roles.init(
	{
		name: DataTypes.STRING
	},
	{
		tableName: "roles",
		sequelize: Database.stcSequelize,
		modelName: "roles"
	}
);
