"use strict";

const tableName = "projects";

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
			name: {
				type: Sequelize.STRING
			},
			slug: {
				type: Sequelize.STRING
			},
			endDate: {
				type: Sequelize.DOUBLE
			},
			description: {
				type: Sequelize.TEXT
			},
			image: {
				type: Sequelize.JSON
			},
			companyId: {
				type: Sequelize.INTEGER,
				references: {
					model: require("./20210922045758-create-company").tableName,
					key: "id"
				},
				onDelete: "CASCADE"
			},
			createdById: {
				type: Sequelize.INTEGER
			},
			updatedById: {
				type: Sequelize.INTEGER
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
