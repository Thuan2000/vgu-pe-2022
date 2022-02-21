"use strict";

const tableName = "services";

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
				type: Sequelize.STRING
			},
			slug: {
				type: Sequelize.STRING
			},
			description: {
				type: Sequelize.TEXT
			},
			industryId: {
				type: Sequelize.INTEGER
			},
			categoryId: {
				type: Sequelize.INTEGER
			},
			location: {
				type: Sequelize.STRING
			},
			images: {
				type: Sequelize.JSON
			},
			certificates: {
				type: Sequelize.JSON
			},
			videos: {
				type: Sequelize.JSON
			},
			price: {
				type: Sequelize.BIGINT
			},
			minPrice: {
				type: Sequelize.BIGINT
			},
			maxPrice: {
				type: Sequelize.BIGINT
			},
			rating: {
				type: Sequelize.INTEGER
			},
			packages: {
				type: Sequelize.JSON
			},
			packageRows: {
				type: Sequelize.JSON
			},
			coverImage: {
				type: Sequelize.JSON
			},
			faqs: {
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
		await queryInterface.dropTable(tableName);
	}
};
