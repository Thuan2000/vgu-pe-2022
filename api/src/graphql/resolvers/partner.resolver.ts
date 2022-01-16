import PartnerController from "../../controllers/partner.controller";

export const Mutation = {
	createPartner: (_, { input }) => PartnerController.createPartner(input),
	updatePartner: (_, { id, input }) =>
		PartnerController.updatePartner(id, input),
	deletePartner: (_, { id }) => PartnerController.deletePartner(id)
};

export const Query = {
	partner: (_, { id }) => PartnerController.getPartner(id),
	partners: () => PartnerController.getPartners()
};
