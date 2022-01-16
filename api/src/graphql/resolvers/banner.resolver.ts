import BannerController from "../../controllers/banner.controller";

export const Mutation = {
	createBanner: (_, { input }) => BannerController.createBanner(input),
	updateBanner: (_, { id, input }) =>
		BannerController.updateBanner(id, input),
	deleteBanner: (_, { id }) => BannerController.deleteBanner(id)
};

export const Query = {
	banner: (_, { id }) => BannerController.getBanner(id),
	banners: () => BannerController.getBanners()
};
