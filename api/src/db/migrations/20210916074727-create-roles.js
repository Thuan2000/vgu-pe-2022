"use strict";

const tableName = "roles";

module.exports = {
	tableName,
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(tableName, {
			name: {
				allowNull: false,
				primaryKey: true,
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
	down: async queryInterface => {
		await queryInterface.dropTable(tableName);
	}
};
