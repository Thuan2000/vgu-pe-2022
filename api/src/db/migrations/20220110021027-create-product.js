"use strict";

const tableName = "products";

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
			companyId: {
				type: Sequelize.INTEGER,
				references: {
					model: require("./20210922045758-create-company").tableName,
					key: "id"
				},
				onDelete: "CASCADE"
			},
			minOrder: {
				type: Sequelize.INTEGER
			},
			industryId: {
				type: Sequelize.INTEGER
			},
			categoryId: {
				type: Sequelize.INTEGER
			},
			warehouseLocation: {
				type: Sequelize.STRING
			},
			coverImage: {
				type: Sequelize.JSON
			},
			gallery: {
				type: Sequelize.JSON
			},
			videos: {
				type: Sequelize.JSON
			},
			variations: {
				type: Sequelize.JSON
			},
			minPrice: {
				type: Sequelize.BIGINT
			},
			maxPrice: {
				type: Sequelize.BIGINT
			},
			price: {
				type: Sequelize.BIGINT
			},
			brandName: {
				type: Sequelize.STRING
			},
			status: {
				type: Sequelize.STRING
			},
			isCustom: {
				type: Sequelize.BOOLEAN
			},
			isPreorder: {
				type: Sequelize.BOOLEAN
			},
			baseDimension: {
				type: Sequelize.JSON
			},
			packagedDimension: {
				type: Sequelize.JSON
			},
			warranty: {
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
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable(tableName);
	}
};
