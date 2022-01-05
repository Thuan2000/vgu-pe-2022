import OpenSearchFunction from "@/functions/open-search.function";
import Company from "@models/Company";
import { isEmptyObject } from "@utils/functions";

const filterKeyFunction = {
	industryId: OpenSearchFunction.getMatchFilter,
	location: OpenSearchFunction.getTermFilter
};

function getFilter(f) {
	const filter = Object.keys(f).flatMap(k => {
		if (!f[k]) return [];

		return filterKeyFunction[k](k, f[k]);
	});

	return filter;
}

class CompanyRepository {
	// static async insertToElasticSearch(
	// 	{name, location, industryId}
	// ) {
	// 	const newBr = { company, ...br };

	// 	Company.insertIndex(newBr);
	// }

	static getSearchQuery = (inputName: string, filter: any) => {
		const query = {
			bool: {
				...OpenSearchFunction.getNameMustQuery(inputName),
				...(!isEmptyObject(filter) ? { filter: getFilter(filter) } : {})
			}
		};
		console.log(query);

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
