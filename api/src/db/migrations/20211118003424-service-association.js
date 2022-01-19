"use strict";

const targetTableName = require("./20211117235522-create-service").tableName;
module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		return Promise.all([
			queryInterface.addColumn(targetTableName, "companyId", {
				type: Sequelize.INTEGER,
				references: {
					model: "companies",
					key: "id"
				},
				onDelete: "CASCADE"
			}),
			queryInterface.addColumn(targetTableName, "createdById", {
				type: Sequelize.INTEGER,
				references: {
					model: "users",
					key: "id"
				},
				onDelete: "CASCADE"
			}),
			queryInterface.addColumn(targetTableName, "updatedById", {
				type: Sequelize.INTEGER,
				references: {
					model: "users",
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
