import { DataTypes, Model } from "sequelize";
import Database from "../utils/database";
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
