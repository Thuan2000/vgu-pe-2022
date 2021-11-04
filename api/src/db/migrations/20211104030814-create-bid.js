"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("bids", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			buyingRequestId: {
				type: Sequelize.INTEGER
			},
			companyId: {
				type: Sequelize.INTEGER
			},
			deliveryDate: {
				type: Sequelize.DATE
			},
			budget: {
				type: Sequelize.BIGINT
			},
			message: {
				type: Sequelize.STRING
			},
			createdById: {
				type: Sequelize.INTEGER
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
		await queryInterface.dropTable("bids");
	}
};
