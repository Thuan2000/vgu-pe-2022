"use strict";

const targetTableName = require("./20210922045758-create-company").tableName;

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		return Promise.all([
			queryInterface.addColumn(targetTableName, "ownerId", {
				type: Sequelize.INTEGER,
				references: {
					model: require("./20210916090212-users").tableName,
					key: "id"
				},
				onDelete: "CASCADE",
				allowNull: false
			}),
			queryInterface.addColumn(targetTableName, "approverId", {
				type: Sequelize.INTEGER,
				references: {
					model: require("./20210916090212-users").tableName,
					key: "id"
				}
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
		return Promise.all([
			queryInterface.removeColumn(targetTableName, "ownerId"),
			queryInterface.removeColumn(targetTableName, "approverId")
		]);
	}
};
