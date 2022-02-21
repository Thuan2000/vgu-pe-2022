"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("partners", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				type: Sequelize.STRING
			},
			description: {
				type: Sequelize.TEXT
			},
			logoUrl: {
				type: Sequelize.STRING
			},
			websiteUrl: {
				type: Sequelize.STRING
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
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("partners");
	}
};
