/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
function getFilePath(fileName) {
	const sqlsDir = "sqls";
	const sqlsRootDir = path.join(__dirname, sqlsDir);
	const filePath = path.join(sqlsRootDir, fileName);

	return filePath;
}

const sqls = [
	{
		name: "Industry",
		path: getFilePath("industries.sql")
	},
	{
		name: "Role",
		path: getFilePath("roles.sql")
	},
	{
		name: "Companies",
		path: getFilePath("companies.sql")
	},
	{
		name: "User",
		path: getFilePath("users.sql")
	},
	{
		name: "Buying Request",
		path: getFilePath("buying_requests.sql")
	},
	{
		name: "Project",
		path: getFilePath("project.sql")
	},
	{
		name: "Product Names",
		path: getFilePath("product_names.sql")
	},
	{
		name: "Category",
		path: getFilePath("categories.sql")
	},
	{
		name: "BR Category",
		path: getFilePath("br_category.sql")
	},
	{
		name: "BR Project",
		path: getFilePath("br_project.sql")
	}
];

module.exports = { sqls };
