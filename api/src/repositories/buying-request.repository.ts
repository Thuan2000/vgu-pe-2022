/* eslint-disable @typescript-eslint/camelcase */
import BuyingRequest from "@models/BuyingRequest";
import ProductName from "@models/ProductName";

export async function setProductName(productName: string) {
	const duplicateProductName: ProductName = await ProductName.findOne({
		where: { name: productName }
	});

	// Creating product name for later use
	if (duplicateProductName) {
		duplicateProductName.set(
			"searchedCount",
			parseInt(duplicateProductName.getDataValue("searchedCount")) + 1
		);
		duplicateProductName.save();
	} else {
		const newProductName = await ProductName.create({
			name: productName,
			searchedCount: 0
		});
		newProductName.save();
	}

	return "Done";
}

export function setBrGallery(data: Promise<unknown>[], br: BuyingRequest) {
	let doneCount = 0;

	data.forEach(async d => {
		d.then(img => {
			++doneCount;
			const currentImgs = br.getDataValue("gallery") || [];
			br.set("gallery", [...currentImgs, img]);

			if (doneCount >= data.length - 1) {
				br.save();
			}
		});
	});
}

function getNameShouldQuery(name: string) {
	return [
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
				name: name?.toLowerCase()
			}
		}
	];
}

function getMinBudgetFilter(minBudget) {
	if (!minBudget) return {};
	return { minBudget: { gte: minBudget } };
}

function getMaxBudgetFilter(maxBudget) {
	if (!maxBudget) return {};
	return { maxBudget: { lte: maxBudget } };
}

export const searchQuery = (inputName: string, filter: any) => {
	const queryAll = { match_all: {} };
	if (!inputName) return queryAll;

	const query = {
		bool: {
			should: getNameShouldQuery(inputName),
			filter: [
				{
					range: {
						...getMinBudgetFilter(filter.minBudget),
						...getMaxBudgetFilter(filter.maxBudget)
					}
				}
			]
		}
	};

	return query;
};

export function nameSuggestionQuery(name: string) {
	const query = {
		bool: {
			should: getNameShouldQuery(name)
		}
	};

	return query;
}
