"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("companies", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			slug: {
				type: Sequelize.STRING,
				allowNull: false
			},
			licenseNumber: {
				type: Sequelize.STRING,
				allowNull: false
			},
			description: {
				type: Sequelize.STRING
			},
			approved: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			coverImage: {
				type: Sequelize.JSON
			},
			gallery: {
				type: Sequelize.JSON
			},
			address: {
				type: Sequelize.JSON
			},
			licenseFiles: {
				type: Sequelize.JSON
			},
			ownerId: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			logo: {
				type: Sequelize.JSON
			},
			settings: {
				type: Sequelize.JSON
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
	down: async queryInterface => {
		await queryInterface.dropTable("companies");
	}
};
