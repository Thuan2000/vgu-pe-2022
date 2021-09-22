import "dotenv/config";
import * as mysql from "mysql";
import { ENODE_ENV, handleError, NODE_ENV } from "../utils";
import { Sequelize } from "sequelize";

export enum ESequelizeDialect {
	MYSQL = "mysql",
	MARIADB = "mariadb",
	MSSQL = "mssql",
	POSTGRES = "postgres",
	SQLITE = "sqlite"
}

function getDatabaseConnectionConfig() {
	if (NODE_ENV === ENODE_ENV.DEVELOPMENT) {
		return {
			dialect: process.env.DEV_DB_DIALECT as ESequelizeDialect,
			host: process.env.DEV_DB_HOST,
			database: process.env.DEV_DB_DATABASE,
			port: parseInt(process.env.DEV_DB_PORT),
			username: process.env.DEV_DB_USERNAME,
			password: process.env.DEV_DB_PASSWORD
		};
	} else {
		return {
			dialect: process.env.DEV_DB_DIALECT as ESequelizeDialect,
			host: process.env.DEV_DB_HOST,
			database: process.env.DEV_DB_DATABASE,
			port: parseInt(process.env.DEV_DB_PORT),
			username: process.env.DEV_DB_USERNAME,
			password: process.env.DEV_DB_PASSWORD
		};
	}
}
class Database {
	static stcSequelize = new Sequelize({
		dialect: "sqlite",
		...getDatabaseConnectionConfig()
	});

	sequelize = new Sequelize(getDatabaseConnectionConfig());

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
