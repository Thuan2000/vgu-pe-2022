/* eslint-disable @typescript-eslint/camelcase */

class OpenSearchFunction {
	static getNameMustQuery(name: string) {
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

	static getNameSuggestionQuery(name: string) {
		return {
			should: [
				{
					match: {
						name: name?.toLowerCase()
					}
				},
				{
					wildcard: {
						name: `*${name?.toLowerCase()}*`
					}
				},
				{
					fuzzy: {
						name: `${name?.toLowerCase()}`
					}
				}
			]
		};
	}

	static getRangeFilter(key: string, value: number) {
		return {
			range: { [key]: { [key.includes("min") ? "gte" : "lte"]: value } }
		};
	}

	static getMatchFilter(key: string, value: string | number) {
		return { match: { [key]: value } };
	}

	static getTermFilter(key: string, value: string | number) {
		return { term: { [key]: value } };
	}
}

export default OpenSearchFunction;
