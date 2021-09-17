"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert("roles", [
			{
				name: "SUPER_ADMIN",
				...require("../utils").timestampGenerator()
			},
			{
				name: "COMPANY_OWNER",
				...require("../utils").timestampGenerator()
			},
			{
				name: "COMPANY_STAFF",
				...require("../utils").timestampGenerator()
			},
			{
				name: "GUEST",
				...require("../utils").timestampGenerator()
			}
		]);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.dropTable("roles");
	}
};
