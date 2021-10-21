"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("projects", {
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
			description: {
				type: Sequelize.STRING
			},
			buyingRequests: {
				type: Sequelize.JSON
			},
			image: {
				type: Sequelize.JSON
			},
			companyId: {
				type: Sequelize.INTEGER
			},
			createdById: {
				type: Sequelize.INTEGER
			},
			updatedById: {
				type: Sequelize.INTEGER
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
		await queryInterface.dropTable("projects");
	}
};
