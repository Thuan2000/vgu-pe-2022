"use strict";

const tableName = "buying_requests";

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
			isSeedData: {
				type: Sequelize.BOOLEAN
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
				type: Sequelize.TEXT
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
			coverImage: {
				type: Sequelize.JSON
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
			isDeleted: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			categoryId: {
				type: Sequelize.INTEGER
			},
			minSupplierExperience: {
				type: Sequelize.INTEGER
			},
			minSupplierSells: {
				type: Sequelize.INTEGER
			},
			sourceTypeId: {
				type: Sequelize.INTEGER
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
		await queryInterface.dropTable(tableName);
	}
};
