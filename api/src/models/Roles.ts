import { DataTypes, Model } from "sequelize";
import Database from "@services/database.service";
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
