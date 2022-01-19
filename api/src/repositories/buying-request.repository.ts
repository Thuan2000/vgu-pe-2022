/* eslint-disable @typescript-eslint/camelcase */
import OpenSearchFunction from "@/functions/open-search.function";
import BuyingRequest from "@models/BuyingRequest";

const filterKeyFunction = {
	industryId: OpenSearchFunction.getMatchFilter,
	categoryId: OpenSearchFunction.getMatchFilter,
	minBudget: OpenSearchFunction.getRangeFilter,
	maxBudget: OpenSearchFunction.getRangeFilter,
	location: OpenSearchFunction.getTermFilter,
	status: OpenSearchFunction.getTermFilter
};

function getFilter(f) {
	const filter = Object.keys(f).flatMap(k => {
		if (!f[k]) return [];

		return filterKeyFunction[k](k, f[k]);
	});

	return filter;
}

class BuyingRequestRepository {
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

export default BuyingRequestRepository;
