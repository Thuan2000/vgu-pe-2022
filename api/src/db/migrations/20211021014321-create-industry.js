"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("industries", {
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
			label: {
				type: Sequelize.STRING
			},
			description: {
				type: Sequelize.STRING
			},
			icon: {
				type: Sequelize.STRING
			},
			backgroundImage: {
				type: Sequelize.JSON
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
		await queryInterface.dropTable("industries");
	}
};
