/* eslint-disable @typescript-eslint/no-var-requires */

const mysql = require("mysql2");
const fs = require("fs");

require("dotenv").config();

const mysqlInstance = mysql.createConnection({
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD
});

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
