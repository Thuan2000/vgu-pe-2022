"use strict";

const tableName = "companies";

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
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			shortName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			slug: {
				type: Sequelize.STRING
			},
			chatId: {
				type: Sequelize.STRING
			},
			// ownerId: {
			// 	type: Sequelize.INTEGER
			// },
			approverId: {
				type: Sequelize.INTEGER
			},
			licenseNumber: {
				type: Sequelize.STRING,
				allowNull: false
			},
			isSubscribeEmail: {
				type: Sequelize.BOOLEAN
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
		await queryInterface.dropTable(tableName);
	}
};
