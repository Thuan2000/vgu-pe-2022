"use strict";

const tableName = "br_discussion_answers";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(tableName, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			brDiscussionQuestionId: {
				type: Sequelize.INTEGER,
				references: {
					model: require("./20211125082401-create-br-discussion-question")
						.tableName,
					key: "id"
				},
				onDelete: "CASCADE"
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: require("./20210916090212-users").tableName,
					key: "id"
				},
				onDelete: "CASCADE"
			},
			companyName: {
				type: Sequelize.STRING,
				references: {
					model: require("./20210922045758-create-company").tableName,
					key: "name"
				},
				onDelete: "CASCADE"
			},
			answer: {
				type: Sequelize.TEXT
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
