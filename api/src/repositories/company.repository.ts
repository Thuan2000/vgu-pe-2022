import OpenSearchFunction from "@/functions/open-search.function";
import Company from "@models/Company";
import { isEmptyObject } from "@utils/functions";

const filterKeyFunction = {
	industryId: OpenSearchFunction.getMatchFilter,
	location: OpenSearchFunction.getTermFilter,
	isSeedData: OpenSearchFunction.getTermFilter
};

function getFilter(f) {
	const filter = Object.keys(f).flatMap(k => {
		if (typeof f[k] !== "boolean" && !f[k]) return [];

		return filterKeyFunction[k](k, f[k]);
	});

	return filter;
}

class CompanyRepository {
	static getSearchQuery = (inputName: string, filter: any) => {
		const query = {
			bool: {
				...OpenSearchFunction.getNameMustQuery(inputName),
				...(!isEmptyObject(filter)
					? {
							filter: [
								{ match: { approved: true } },
								...getFilter(filter)
							]
					  }
					: { filter: [{ match: { approved: true } }] })
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

export default CompanyRepository;
