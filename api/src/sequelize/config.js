module.exports = {
	development: {
		dialect: process.env.DB_DIALECT,
		host: process.env.DB_HOST,
		database: process.env.DB_DATABASE,
		port: parseInt(process.env.DB_PORT),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD
	},
	production: {
		dialect: process.env.DB_DIALECT,
		host: process.env.DB_HOST,
		database: process.env.DB_DATABASE,
		port: parseInt(process.env.DB_PORT),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD
	}
};
