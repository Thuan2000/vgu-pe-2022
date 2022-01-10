import OpenSearchFunction from "../functions/open-search.function";

const filterKeyFunction = {
	companyId: OpenSearchFunction.getMatchFilter,
	industryId: OpenSearchFunction.getMatchFilter,
	categoryId: OpenSearchFunction.getMatchFilter,
	price: OpenSearchFunction.getRangeFilter,
	minPrice: OpenSearchFunction.getRangeFilter,
	maxPrice: OpenSearchFunction.getRangeFilter,
	location: OpenSearchFunction.getTermFilter
};

function getFilter(f) {
	const filter = Object.keys(f).flatMap(k => {
		if (!f[k]) return [];

		return filterKeyFunction[k](k, f[k]);
	});

	return filter;
}

class ProductRepository {
	static getSearchQuery = (inputName: string, filter: any) => {
		const query = {
			bool: {
				...OpenSearchFunction.getNameMustQuery(inputName),
				filter: getFilter(filter)
			}
		};

		return query;
	};
}

export default ProductRepository;
