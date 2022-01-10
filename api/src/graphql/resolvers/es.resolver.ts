import BuyingRequest from "../../models/BuyingRequest";
import Company from "../../models/Company";
import Product from "../../models/Product";
import Service from "../../models/Service";
import { successResponse } from "../../utils";

const esQueries = {
	createEsIndexes: async () => {
		try {
			await BuyingRequest.createIndex();
			await Company.createIndex();
			await Service.createIndex();
			await Product.createIndex();
		} catch (e) {
			console.log(e);
		}
	},
	firstBulkEsIndexes: async () => {
		try {
			await BuyingRequest.firstBulkElasticSearch();
			await Company.firstBulkElasticSearch();
			await Service.firstBulkElasticSearch();
			await Product.firstBulkElasticSearch();
		} catch (e) {
			console.log(e);
		}
	},
	deleteEsIndexes: async () => {
		try {
			await BuyingRequest.deleteIndex();
			await Company.deleteIndex();
			await Service.deleteIndex();
			await Product.deleteIndex();
		} catch (e) {
			console.log(e);
		}
	}
};

export const Query = {
	...esQueries,
	refreshElasticSearch: async () => {
		try {
			const deleteResp = await esQueries.deleteEsIndexes();

			setTimeout(async () => {
				await esQueries.createEsIndexes();
				await esQueries.firstBulkEsIndexes();
			}, 500);

			return successResponse();
		} catch (e) {
			console.error(e);
		}
	}
};
