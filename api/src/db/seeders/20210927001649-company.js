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
			"companies",
			[
				{
					name: "Fatwa Company",
					slug: "fatwa-company",
					licenseNumber: "FCS345SF",
					description: "This company is belong to Fatwa",
					approved: true,
					coverImage: null,
					gallery: null,
					address: null,
					// licenseFiles: {
					// 	key: "fatwa-company-licenses",
					// 	location: "https://instagram.com"
					// },
					licenseFiles: null,
					ownerId: 1,
					logo: null,
					settings: null,
					...require("../utils").timestampGenerator()
				},
				{
					name: "Emolyze Tech",
					slug: "emolyze-tech",
					licenseNumber: "FCS345SF",
					description: "This company is belong to thuan",
					approved: true,
					coverImage: null,
					gallery: null,
					address: null,
					// licenseFiles: {
					// 	key: "thuan-company-licenses",
					// 	location: "https://instagram.com"
					// },
					licenseFiles: null,
					ownerId: 2,
					logo: null,
					settings: null,
					...require("../utils").timestampGenerator()
				},
				{
					name: "Test1 Company",
					slug: "test1-company",
					licenseNumber: "FCS345SF",
					description: "This company is belong to test1",
					approved: true,
					coverImage: null,
					gallery: null,
					address: null,
					// licenseFiles: {
					// 	key: "test1-company-licenses",
					// 	location: "https://instagram.com"
					// },
					licenseFiles: null,
					ownerId: 3,
					logo: null,
					settings: null,
					...require("../utils").timestampGenerator()
				},
				{
					name: "Test2 Company",
					slug: "test2-company",
					licenseNumber: "FCS345SF",
					description: "This company is belong to test2",
					approved: true,
					coverImage: null,
					gallery: null,
					address: null,
					// licenseFiles: {
					// 	key: "test2-company-licenses",
					// 	location: "https://instagram.com"
					// },
					licenseFiles: null,
					ownerId: 4,
					logo: null,
					settings: null,
					...require("../utils").timestampGenerator()
				},
				{
					name: "Test3 Company",
					slug: "test3-company",
					licenseNumber: "FCS345SF",
					description: "This company is belong to test3",
					approved: true,
					coverImage: null,
					gallery: null,
					address: null,
					// licenseFiles: {
					// 	key: "test3-company-licenses",
					// 	location: "https://instagram.com"
					// },
					licenseFiles: null,
					ownerId: 5,
					logo: null,
					settings: null,
					...require("../utils").timestampGenerator()
				},
				{
					name: "Test4 Company",
					slug: "test4-company",
					licenseNumber: "FCS345SF",
					description: "This company is belong to test4",
					approved: true,
					coverImage: null,
					gallery: null,
					address: null,
					// licenseFiles: {
					// 	key: "test4-company-licenses",
					// 	location: "https://instagram.com"
					// },
					licenseFiles: null,
					ownerId: 6,
					logo: null,
					settings: null,
					...require("../utils").timestampGenerator()
				},
				{
					name: "Test5 Company",
					slug: "test5-company",
					licenseNumber: "FCS345SF",
					description: "This company is belong to test5",
					approved: true,
					coverImage: null,
					gallery: null,
					address: null,
					// licenseFiles: {
					// 	key: "test5-company-licenses",
					// 	location: "https://instagram.com"
					// },
					licenseFiles: null,
					ownerId: 7,
					logo: null,
					settings: null,
					...require("../utils").timestampGenerator()
				},
				{
					name: "Vietphat Group",
					slug: "vietphat-group",
					licenseNumber: "FCS345SF",
					description: "This company is belong to vietphat group",
					approved: true,
					coverImage: null,
					gallery: null,
					address: null,
					// licenseFiles: {
					// 	key: "vietphat-group-licenses",
					// 	location: "https://instagram.com"
					// },
					licenseFiles: null,
					ownerId: 8,
					logo: null,
					settings: null,
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
