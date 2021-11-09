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
			slug: {
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
				type: Sequelize.BIGINT
			},
			maxBudget: {
				type: Sequelize.BIGINT
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
			allowedCompany: {
				type: Sequelize.JSON
			},
			biddersLimit: {
				type: Sequelize.INTEGER
			},
			industryId: {
				type: Sequelize.INTEGER
			},
			categoryIds: {
				type: Sequelize.JSON
			},
			status: {
				type: Sequelize.STRING,
				defaultValue: "OPEN"
			},
			lastOpened: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: new Date()
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: new Date()
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: new Date()
			}
		});
	},
	down: async queryInterface => {
		await queryInterface.dropTable("buying_requests");
	}
};
