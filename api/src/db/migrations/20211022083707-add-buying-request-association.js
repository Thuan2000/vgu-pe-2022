"use strict";

const targetTableName = require("./20211005084832-create-buying-request")
	.tableName;

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		return Promise.all([
			// queryInterface.addColumn("buying_requests", "industryId", {
			// 	type: Sequelize.INTEGER,
			// 	references: {
			// 		model: "industries",
			// 		key: "id"
			// 	},
			// 	onDelete: "SET NULL"
			// }),

			queryInterface.addColumn(targetTableName, "companyId", {
				type: Sequelize.INTEGER,
				references: {
					model: require("./20210922045758-create-company").tableName,
					key: "id"
				},
				onDelete: "CASCADE"
			}),
			queryInterface.addColumn(targetTableName, "createdById", {
				type: Sequelize.INTEGER,
				references: {
					model: require("./20210916090212-users").tableName,
					key: "id"
				},
				onDelete: "CASCADE"
			}),
			queryInterface.addColumn(targetTableName, "updatedById", {
				type: Sequelize.INTEGER,
				references: {
					model: require("./20210916090212-users").tableName,
					key: "id"
				},
				onDelete: "SET NULL"
			})
		]);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	}
};
