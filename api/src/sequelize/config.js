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
		dialect: process.env.DEV_DB_DIALECT,
		host: process.env.DEV_DB_HOST,
		database: process.env.DEV_DB_DATABASE,
		port: parseInt(process.env.DEV_DB_PORT),
		username: process.env.DEV_DB_USERNAME,
		password: process.env.DEV_DB_PASSWORD
	}
};
