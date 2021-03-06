/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
function getFilePath(fileName) {
	const sqlsDir = "sqls";
	const sqlsRootDir = path.join(__dirname, sqlsDir);
	const filePath = path.join(sqlsRootDir, fileName);

	return filePath;
}

const sqls = [
	// {
	// 	name: "Role",
	// 	path: getFilePath("roles.sql")
	// },
	{
		name: "Companies",
		path: getFilePath("companies.sql")
	},
	{
		name: "User",
		path: getFilePath("users.sql")
	},
	// {
	// 	name: "Buying Request",
	// 	path: getFilePath("buying_requests.sql")
	// },
	// {
	// 	name: "Project",
	// 	path: getFilePath("project.sql")
	// },
	// {
	// 	name: "BR Project",
	// 	path: getFilePath("br_project.sql")
	// },
	{
		name: "Subscription",
		path: getFilePath("subscriptions.sql")
	},
	{
		name: "Company Subscription",
		path: getFilePath("company_subscriptions.sql")
	},
	// {
	// 	name: "Product",
	// 	path: getFilePath("products.sql")
	// },
	// {
	// 	name: "Service",
	// 	path: getFilePath("services.sql")
	// },
	{
		name: "Banner",
		path: getFilePath("banners.sql")
	},
	{
		name: "Partner",
		path: getFilePath("partners.sql")
	}
];

module.exports = { sqls };
