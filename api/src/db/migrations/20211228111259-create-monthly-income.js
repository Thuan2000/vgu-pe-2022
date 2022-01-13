"use strict";

const tableName = "monthly_incomes";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(tableName, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			year: {
				type: Sequelize.INTEGER
			},
			month: {
				type: Sequelize.INTEGER
			},
			amount: {
				type: Sequelize.INTEGER
			},
			createdAt: {
				type: Sequelize.DATE
			},
			updatedAt: {
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable(tableName);
	}
};
