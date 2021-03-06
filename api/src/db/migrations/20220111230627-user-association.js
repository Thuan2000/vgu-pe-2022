"use strict";

const targetTableName = require("./20210916090212-users").tableName;

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
				type: Sequelize.INTEGER
				// references: {
				// 	model: require("./20210922045758-create-company").tableName,
				// 	key: "id"
				// },
				// onDelete: "CASCADE"
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
		queryInterface.removeColumn(targetTableName, "companyId");
	}
};
