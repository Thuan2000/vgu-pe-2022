"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("company_subscriptions", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			companyId: {
				type: Sequelize.INTEGER
			},
			subscriptionId: {
				type: Sequelize.INTEGER
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
		await queryInterface.dropTable("company_subscriptions");
	}
};
