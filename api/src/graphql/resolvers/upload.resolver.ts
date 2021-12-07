import UploaderController from "@controllers/uploader.controller";

export const Mutation = {
	uploadFiles: async (_, { input }) =>
		await UploaderController.uploadFiles(input)
};
