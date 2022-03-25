import AlreadyPaidCompanyController from "@controllers/already-paid-company.controller";

export const Mutation = {
	addAlreadyPaidCompany: (_, { input }) =>
		AlreadyPaidCompanyController.addAlreadyPaidCompany(input)
};

export const Query = {
	getAlreadyPaidCompanies: () =>
		AlreadyPaidCompanyController.getAlreadyPaidCompanies()
};
