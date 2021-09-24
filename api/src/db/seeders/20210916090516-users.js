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
		await queryInterface.bulkInsert("users", [
			{
				firstName: "Fatwa",
				lastName: "Anugerah",
				email: "fatwa@gmail.com",
				password:
					"$2b$10$YMb7P7S0nJgT7PeyzZa9aOyldj5Gwysg6NrtabElyfAzPNIuFPfb2",
				role: "SUPER_ADMIN",
				...require("../utils").timestampGenerator()
			},
			{
				firstName: "test",
				lastName: "1",
				email: "test1@emolyze.vn",
				password:
					"$2b$10$Xlik2Ui8MvmcRV8Bzs4vkuDvReUCPhuCGWt4mBL34FVvKJT8UXR/.",
				role: "SUPER_ADMIN",
				...require("../utils").timestampGenerator()
			},
			{
				firstName: "test",
				lastName: "2",
				email: "test2@emolyze.vn",
				password:
					"$2b$10$Xlik2Ui8MvmcRV8Bzs4vkuDvReUCPhuCGWt4mBL34FVvKJT8UXR/.",
				role: "SUPER_ADMIN",
				...require("../utils").timestampGenerator()
			},
			{
				firstName: "test",
				lastName: "2",
				email: "test2@emolyze.vn",
				password:
					"$2b$10$Xlik2Ui8MvmcRV8Bzs4vkuDvReUCPhuCGWt4mBL34FVvKJT8UXR/.",
				role: "SUPER_ADMIN",
				...require("../utils").timestampGenerator()
			},
			{
				firstName: "test",
				lastName: "3",
				email: "test3@emolyze.vn",
				password:
					"$2b$10$Xlik2Ui8MvmcRV8Bzs4vkuDvReUCPhuCGWt4mBL34FVvKJT8UXR/.",
				role: "SUPER_ADMIN",
				...require("../utils").timestampGenerator()
			},
			{
				firstName: "test",
				lastName: "4",
				email: "test4@emolyze.vn",
				password:
					"$2b$10$Xlik2Ui8MvmcRV8Bzs4vkuDvReUCPhuCGWt4mBL34FVvKJT8UXR/.",
				role: "SUPER_ADMIN",
				...require("../utils").timestampGenerator()
			},
			{
				firstName: "test",
				lastName: "5",
				email: "test5@emolyze.vn",
				password:
					"$2b$10$Xlik2Ui8MvmcRV8Bzs4vkuDvReUCPhuCGWt4mBL34FVvKJT8UXR/.",
				role: "SUPER_ADMIN",
				...require("../utils").timestampGenerator()
			},
			{
				firstName: "Vietphat",
				lastName: "Group",
				email: "vietphat@emolyze.vn",
				password:
					"$2b$10$Xlik2Ui8MvmcRV8Bzs4vkuDvReUCPhuCGWt4mBL34FVvKJT8UXR/.",
				role: "SUPER_ADMIN",
				...require("../utils").timestampGenerator()
			},
			{
				firstName: "Thuan",
				lastName: "Nguyen",
				email: "thuan@emolyze.vn",
				password:
					"$2b$10$Xlik2Ui8MvmcRV8Bzs4vkuDvReUCPhuCGWt4mBL34FVvKJT8UXR/.",
				role: "SUPER_ADMIN",
				...require("../utils").timestampGenerator()
			}
		]);
	}
};
