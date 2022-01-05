/* eslint-disable @typescript-eslint/camelcase */
import OpenSearchFunction from "@/functions/open-search.function";
import BuyingRequest from "@models/BuyingRequest";
import Service from "@models/Service";

const filterKeyFunction = {
	companyId: OpenSearchFunction.getMatchFilter,
	industryId: OpenSearchFunction.getMatchFilter,
	categoryId: OpenSearchFunction.getMatchFilter,
	minBudget: OpenSearchFunction.getRangeFilter,
	maxBudget: OpenSearchFunction.getRangeFilter,
	location: OpenSearchFunction.getTermFilter
};

function getFilter(f) {
	const filter = Object.keys(f).flatMap(k => {
		if (!f[k]) return [];

		return filterKeyFunction[k](k, f[k]);
	});

	return filter;
}

class ServiceRepository {
	static async insertCreateToElasticSearch(service, companyId, companyName) {
		try {
			const company = {
				id: companyId,
				name: companyName
			};

			Service.insertToIndex({ company, ...service });
		} catch (e) {
			console.log(e);
		}
	}

	static getSearchQuery = (inputName: string, filter: any) => {
		const query = {
			bool: {
				...OpenSearchFunction.getNameMustQuery(inputName),
				filter: getFilter(filter)
			}
		};

		return query;
	};

	static nameSuggestionQuery(name: string) {
		const query = {
			bool: {
				...OpenSearchFunction.getNameSuggestionQuery(name)
			}
		};

		return query;
	}
}

export default ServiceRepository;
