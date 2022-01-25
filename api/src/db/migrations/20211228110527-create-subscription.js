"use strict";

const tableName = "subscriptions";

module.exports = {
	tableName,
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(tableName, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			nameEn: {
				type: Sequelize.STRING
			},
			nameVn: {
				type: Sequelize.STRING
			},
			monthlyPrice: {
				type: Sequelize.INTEGER
			},
			description: {
				type: Sequelize.TEXT
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
