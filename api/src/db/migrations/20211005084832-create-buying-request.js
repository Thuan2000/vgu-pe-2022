"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("buying_requests", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			endDate: {
				type: Sequelize.DOUBLE
			},
			location: {
				type: Sequelize.STRING
			},
			description: {
				type: Sequelize.STRING
			},
			productName: {
				type: Sequelize.STRING
			},
			minBudget: {
				type: Sequelize.INTEGER
			},
			maxBudget: {
				type: Sequelize.INTEGER
			},
			minOrder: {
				type: Sequelize.INTEGER
			},
			unit: {
				type: Sequelize.STRING
			},
			gallery: {
				type: Sequelize.JSON
			},
			categories: {
				type: Sequelize.JSON
			},
			allowedCompany: {
				type: Sequelize.JSON
			},
			companyId: {
				type: Sequelize.INTEGER
			},
			status: {
				type: Sequelize.STRING,
				defaultValue: "OPEN"
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("buying_requests");
	}
};
