import "dotenv/config";
import * as mysql from "mysql";
import { handleError } from ".";
import { Sequelize } from "sequelize";

class Database {
	dbConnection = mysql.createConnection({
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT),
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE
	});

	static stcSequelize = new Sequelize({
		dialect: "mysql",
		host: process.env.DB_HOST,
		database: process.env.DB_DATABASE,
		port: parseInt(process.env.DB_PORT),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD
	});

	sequelize = new Sequelize({
		dialect: "mysql",
		host: process.env.DB_HOST,
		database: process.env.DB_DATABASE,
		port: parseInt(process.env.DB_PORT),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD
	});

	async connect() {
		try {
			await this.sequelize.authenticate();
			console.log("Connection OK");
		} catch (error) {
			console.log(error);
		}
	}
}

export default Database;
