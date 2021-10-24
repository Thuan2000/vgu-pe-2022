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
			dialect: process.env.PROD_DB_DIALECT as ESequelizeDialect,
			host: process.env.PROD_DB_HOST,
			database: process.env.PROD_DB_DATABASE,
			port: parseInt(process.env.PROD_DB_PORT),
			username: process.env.PROD_DB_USERNAME,
			password: process.env.PROD_DB_PASSWORD,
			logging: false
		};
	}
}
class Database {
	static stcSequelize = new Sequelize(getDatabaseConnectionConfig());

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
