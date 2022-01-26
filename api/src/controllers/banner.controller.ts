import { IBannerInput } from "../graphql/types";
import Banner from "../models/Banner";
import { errorResponse, successResponse } from "../utils";

class BannerController {
	static async createBanner(input: IBannerInput) {
		try {
			await Banner.create({ ...input });
			return successResponse();
		} catch (e) {
			console.error(e);
			return errorResponse();
		}
	}

	static async deleteBanner(id: number) {
		try {
			await Banner.destroy({ where: { id } });
			return successResponse();
		} catch (e) {
			console.error(e);
			return errorResponse();
		}
	}

	static async updateBanner(id: number, newValue: IBannerInput) {
		try {
			await Banner.update(newValue, { where: { id } });
			return successResponse();
		} catch (e) {
			console.error(e);
			return errorResponse();
		}
	}

	static async getBanners() {
		try {
			const banners = await Banner.findAll();
			return banners;
		} catch (e) {
			console.error(e);
			return errorResponse();
		}
	}

	static async getBanner(id: number) {
		try {
			const banner = await Banner.findByPk(id);
			return banner;
		} catch (e) {
			console.error(e);
			return errorResponse();
		}
	}
}

export default BannerController;
