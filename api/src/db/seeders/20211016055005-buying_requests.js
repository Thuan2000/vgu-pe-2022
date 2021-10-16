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

		await queryInterface.bulkInsert("buying_requests", [
			{
				name: "Nhu cầu mua 10 mét dây đồng",
				description:
					"Miêu tả ngắn về nhu cầu mua We are looking for a supplier to buy 500 tons of wires in Hanoi to install lamps in central park. Miêu tả ngắn về nhu cầu mua We are looking for a supplier to buy 500 tons of wires in Hanoi to install lamps in central park.",
				endDate: 1635459891000,
				slug: "nhu-cầu-mua-10-mét-dây-đồng",
				location: "Bắc Giang",
				minBudget: 500000000,
				maxBudget: 500000000,
				minOrder: 500,
				unit: "Pc",
				companyId: 1,
				createdById: 1,
				status: "OPEN",
				...require("../utils").timestampGenerator()
			}
		]);
	}
};
