"use strict";

const tableName = "product_discussion_answers";

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
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: require("./20210916090212-users").tableName,
					key: "id"
				}
			},
			productDiscussionQuestionId: {
				type: Sequelize.INTEGER,
				references: {
					model: require("./20220111215538-create-product-discussion-question")
						.tableName,
					key: "id"
				}
			},
			answer: {
				type: Sequelize.TEXT
			},
			companyName: {
				type: Sequelize.STRING,
				references: {
					model: require("./20210922045758-create-company").tableName,
					key: "name"
				},
				onDelete: "CASCADE"
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
