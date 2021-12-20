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
			membership: {
				type: Sequelize.INTEGER
			},
			description: {
				type: Sequelize.TEXT
			},
			approved: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			licenseFiles: {
				type: Sequelize.JSON
			},
			certificates: {
				type: Sequelize.JSON
			},
			ownerId: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			isFullInfo: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			location: {
				type: Sequelize.STRING
			},
			settings: {
				type: Sequelize.JSON
			},
			industryId: {
				type: Sequelize.INTEGER
			},
			businessTypeIds: {
				type: Sequelize.JSON
			},
			establishmentDate: {
				type: Sequelize.DATE
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
		await queryInterface.dropTable("companies");
	}
};
