"use strict";

const tableName = "br_project";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.createTable(tableName, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			buyingRequestId: {
				type: Sequelize.INTEGER,
				references: {
					model: "buying_requests",
					key: "id"
				},
				onDelete: "CASCADE",
				allowNull: false
			},
			projectId: {
				type: Sequelize.INTEGER,
				references: {
					model: "projects",
					key: "id"
				},
				onDelete: "CASCADE",
				allowNull: false
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
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 
		 */
		await queryInterface.dropTable(tableName);
	}
};
