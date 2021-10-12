"use strict";

module.exports = {
	up: async queryInterface => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			"product_names",
			[
				{
					name: "Apple",
					searchedCount: 1,
					...require("../utils").timestampGenerator()
				},
				{
					name: "Tempered Glass 5",
					searchedCount: 0,
					...require("../utils").timestampGenerator()
				},
				{
					name: "Acer Monitor",
					searchedCount: 0,
					...require("../utils").timestampGenerator()
				}
			],
			{}
		);
	},

	down: async () => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	}
};
