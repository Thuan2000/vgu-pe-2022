"use strict";

const tableName = "already_paid_companies";

module.exports = {
	tableName,
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(tableName, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			companyId: {
				type: Sequelize.INTEGER
			},
			isSubscribed: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			transferReceipt: {
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
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable(tableName);
	}
};
