"use strict";

const tableName = "company_subscriptions";

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
			companyId: {
				type: Sequelize.INTEGER,
				references: {
					model: require("./20210922045758-create-company").tableName,
					key: "id"
				},
				onDelete: "CASCADE"
			},
			subscriptionId: {
				type: Sequelize.INTEGER,
				references: {
					model: require("./20211228110527-create-subscription")
						.tableName,
					key: "id"
				},
				onDelete: "CASCADE"
			},
			monthAmount: {
				type: Sequelize.INTEGER
			},
			startAt: {
				type: Sequelize.BIGINT
			},
			totalPrice: {
				type: Sequelize.INTEGER
			},
			createdAt: {
				type: Sequelize.DATE
			},
			updatedAt: {
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable(tableName);
	}
};
