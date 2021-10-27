"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		return Promise.all([
			queryInterface.addColumn("buying_requests", "industryId", {
				type: Sequelize.INTEGER,
				references: {
					model: "industries",
					key: "id"
				},
				onDelete: "SET NULL"
			}),

			queryInterface.addColumn("buying_requests", "companyId", {
				type: Sequelize.INTEGER,
				references: {
					model: "companies",
					key: "id"
				},
				onDelete: "CASCADE"
			}),
			queryInterface.addColumn("buying_requests", "createdById", {
				type: Sequelize.INTEGER,
				references: {
					model: "users",
					key: "id"
				},
				onDelete: "CASCADE"
			}),
			queryInterface.addColumn("buying_requests", "updatedById", {
				type: Sequelize.INTEGER,
				references: {
					model: "users",
					key: "id"
				},
				onDelete: "SET NULL"
			})
		]);
	},

	down: async queryInterface => {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		return Promise.all([
			queryInterface.removeColumn("buying_requests", "industryId")
		]);
	}
};
