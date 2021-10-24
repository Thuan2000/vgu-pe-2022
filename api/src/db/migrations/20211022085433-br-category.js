"use strict";

const tableName = "br_category";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		queryInterface.createTable(tableName, {
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
			categoryId: {
				type: Sequelize.INTEGER,
				references: {
					model: "categories",
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
		queryInterface.dropTable(tableName);
	}
};
