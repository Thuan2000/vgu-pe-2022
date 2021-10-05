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
			"categories",
			[
				{
					name: "Food",
					slug: "food",
					...require("../utils").timestampGenerator()
				},
				{
					name: "Sport",
					slug: "sport",
					...require("../utils").timestampGenerator()
				}
			],
			{}
		);
	}
};
