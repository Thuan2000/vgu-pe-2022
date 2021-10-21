module.exports = {
	development: {
		dialect: process.env.DEV_DB_DIALECT,
		host: process.env.DEV_DB_HOST,
		database: process.env.DEV_DB_DATABASE,
		port: parseInt(process.env.DEV_DB_PORT),
		username: process.env.DEV_DB_USERNAME,
		password: process.env.DEV_DB_PASSWORD
	},
	production: {
		dialect: process.env.PROD_DB_DIALECT,
		host: process.env.PROD_DB_HOST,
		database: process.env.PROD_DB_DATABASE,
		port: parseInt(process.env.PROD_DB_PORT),
		username: process.env.PROD_DB_USERNAME,
		password: process.env.PROD_DB_PASSWORD
	}
};
