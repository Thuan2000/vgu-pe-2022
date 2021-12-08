import "dotenv/config";
import { ENODE_ENV, NODE_ENV } from "@utils";
import { Options, Sequelize } from "sequelize";

export enum ESequelizeDialect {
	MYSQL = "mysql",
	MARIADB = "mariadb",
	MSSQL = "mssql",
	POSTGRES = "postgres",
	SQLITE = "sqlite"
}

function getDatabaseConnectionConfig(): Options {
	return {
		dialect: process.env.DB_DIALECT as ESequelizeDialect,
		host: process.env.DB_HOST,
		database: process.env.DB_DATABASE,
		port: parseInt(process.env.DB_PORT),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		logging: false
	};
}
class Database {
	static stcSequelize = new Sequelize(getDatabaseConnectionConfig());

	static sequelize = new Sequelize(getDatabaseConnectionConfig());

	static async connect() {
		try {
			await this.stcSequelize.authenticate();
			console.log("Connection OK");
		} catch (error) {
			console.log(error);
		}
	}
}

export default Database;
