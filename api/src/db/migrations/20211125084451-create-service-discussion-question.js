"use strict";

const tableName = "service_discussion_questions";

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
				},
				onDelete: "CASCADE",
				allowNull: false
			},
			serviceId: {
				type: Sequelize.INTEGER,
				references: {
					model: require("./20211117235522-create-service").tableName,
					key: "id"
				},
				onDelete: "CASCADE",
				allowNull: false
			},
			question: {
				type: Sequelize.TEXT
			},
			companyName: {
				type: Sequelize.STRING,
				references: {
					model: require("./20210922045758-create-company").tableName,
					key: "name"
				},
				onDelete: "CASCADE",
				allowNull: false
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
