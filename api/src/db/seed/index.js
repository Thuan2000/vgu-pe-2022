/* eslint-disable @typescript-eslint/no-var-requires */

const mysql = require("mysql2");
const fs = require("fs");

require("dotenv").config();

const nodeEnv = process.env.NODE_ENV;

function getMysqlProdConnection() {
	return {
		host: process.env.PROD_DB_HOST,
		database: process.env.PROD_DB_DATABASE,
		port: process.env.PROD_DB_PORT,
		user: process.env.PROD_DB_USERNAME,
		password: process.env.PROD_DB_PASSWORD
	};
}

function getMysqlDevConnection() {
	return {
		host: process.env.DEV_DB_HOST,
		database: process.env.DEV_DB_DATABASE,
		port: process.env.DEV_DB_PORT,
		user: process.env.DEV_DB_USERNAME,
		password: process.env.DEV_DB_PASSWORD
	};
}

const mysqlInstance = mysql.createConnection(
	nodeEnv.toLowerCase() === "production"
		? getMysqlProdConnection()
		: getMysqlDevConnection()
);

mysqlInstance.connect();

for (const sql of require("./sqlsList").sqls) {
	try {
		// Read seed query
		const seedQuery = fs.readFileSync(sql.path, {
			encoding: "utf-8"
		});

		console.log(`SEEDING : ${sql.name}`);
		mysqlInstance.query(seedQuery, err => {
			console.log(`SEEDED : ${sql.name}`);

			if (err) {
				console.log(`ERROR AT: ${sql.name}`);
				console.log(err);
			}
		});
	} catch (error) {
		console.log(`ERROR AT: ${sql.name}`);
		console.log(error);
	}
}

mysqlInstance.end();
