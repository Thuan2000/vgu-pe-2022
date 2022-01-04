/* eslint-disable @typescript-eslint/camelcase */
import BuyingRequest from "@models/BuyingRequest";

function getNameShouldQuery(name: string) {
	if (!name) return { should: [{ match_all: {} }] };

	return {
		must: [
			{
				match: {
					name: name?.toLowerCase()
				}
			}
		]
	};
}

function getRangeFilter(key: string, value: number) {
	return {
		range: { [key]: { [key.includes("min") ? "gte" : "lte"]: value } }
	};
}

function getMatchFilter(key: string, value: string | number) {
	return { match: { [key]: value } };
}

function getTermFilter(key: string, value: string | number) {
	return { term: { [key]: value } };
}

const filterKeyFunction = {
	industryId: getMatchFilter,
	categoryId: getMatchFilter,
	minBudget: getRangeFilter,
	maxBudget: getRangeFilter,
	location: getTermFilter,
	status: getTermFilter
};

function getFilter(f) {
	const filter = Object.keys(f).flatMap(k => {
		if (!f[k]) return [];

		return filterKeyFunction[k](k, f[k]);
	});

	return filter;
}

class BuyingRequestRepository {
	static async insertCreateToElasticSearch(
		br,
		companyId: number,
		companyName
	) {
		const company = {
			id: companyId,
			name: companyName
		};
		const newBr = { company, ...br };

		BuyingRequest.insertIndex(newBr);
	}

	static getSearchQuery = (inputName: string, filter: any) => {
		const query = {
			bool: {
				...getNameShouldQuery(inputName),
				filter: getFilter(filter)
			}
		};

		return query;
	};

	static nameSuggestionQuery(name: string) {
		const query = {
			bool: {
				...getNameShouldQuery(name)
			}
		};

		return query;
	}
}

export default BuyingRequestRepository;
