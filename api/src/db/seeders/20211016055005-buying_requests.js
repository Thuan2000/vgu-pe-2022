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
			"buying_requests",
			[
				{
					name: "Nhu cầu mua 10 mét dây đồng",
					description:
						"Miêu tả ngắn về nhu cầu mua We are looking for a supplier to buy 500 tons of wires in Hanoi to install lamps in central park. Miêu tả ngắn về nhu cầu mua We are looking for a supplier to buy 500 tons of wires in Hanoi to install lamps in central park.",
					endDate: 1635459891000,
					slug: "nhu-cầu-mua-10-mét-dây-đồng",
					allowedCompany: {},
					location: "Bắc Giang",
					minBudget: 500000000,
					maxBudget: 500000000,
					minOrder: 500,
					unit: "Pc",
					companyId: 1,
					createdBy: 1,
					status: "OPEN",
					projectIds: [],
					commentIds: [],
					bidIds: [],
					gallery: [
						{
							key:
								"Fatwa Company/br-images/1634077642623-nvidia gtx 1080ti.jpeg",
							location:
								"https://sdconnect-dev.s3.ap-southeast-1.amazonaws.com/Fatwa%20Company/br-images/1634077642623-nvidia%20gtx%201080ti.jpeg"
						}
					],
					...require("../utils").timestampGenerator()
				}
			],
			{}
		);
	}
};
