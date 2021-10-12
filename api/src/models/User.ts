/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */

import { DataTypes, Model } from "sequelize";
import Database from "@services/database.service";
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
		companyId: {
			type: DataTypes.INTEGER
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phoneNumber: {
			type: DataTypes.STRING
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
