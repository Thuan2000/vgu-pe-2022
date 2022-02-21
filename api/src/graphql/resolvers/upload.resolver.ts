import UploaderController from "@controllers/uploader.controller";

export const Mutation = {
	uploadFiles: async (_, { input }) => UploaderController.uploadFiles(input),
	deleteFile: (_, { location }) => UploaderController.deleteFile(location)
};
