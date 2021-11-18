import TagController from "@controllers/tag.controller";

export const Query = {
	tags: (_, { locale }) => TagController.getTags(locale)
};
