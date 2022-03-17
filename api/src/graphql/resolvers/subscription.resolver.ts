import CompanySubscriptionController from "@controllers/company-subscription.controller";

export const Query = {
	companySubscription: (_, { companyId }) =>
		CompanySubscriptionController.getSubscription(companyId)
};

export const Mutation = {
	subscribe: (_, { companyId, subscriptionId, expDate }) =>
		CompanySubscriptionController.subscribe(
			companyId,
			subscriptionId,
			expDate
		)
};
