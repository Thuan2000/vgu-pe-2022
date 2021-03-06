/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */

import { DataTypes, Model } from "sequelize";
import Database from "@services/database.service";
import Company from "./Company";

export default class User extends Model {}

User.init(
	{
		// Model attributes are defined here
		firstLogin: DataTypes.BOOLEAN,
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		companyId: DataTypes.INTEGER,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		phoneNumber: DataTypes.STRING,
		role: DataTypes.STRING,
		isSeedData: DataTypes.BOOLEAN
	},
	{
		tableName: "users",
		// Other model options go here
		sequelize: Database.stcSequelize, // We need to pass the connection instance
		modelName: "user" // We need to choose the model name
	}
);
