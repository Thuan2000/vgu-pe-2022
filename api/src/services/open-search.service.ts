/* eslint-disable @typescript-eslint/interface-name-prefix */
import { Client } from "@opensearch-project/opensearch";
import { errorResponse } from "@utils/responses";

interface IMappingProperties {
	[key: string]: {
		type: string;
	};
}

class OpenSearch {
	private static client = new Client({
		node: process.env.ES_ENDPOINT,
		auth: {
			username: process.env.ES_USERNAME,
			password: process.env.ES_PASSWORD
		}
	});

	static createIndex(index, properties?: IMappingProperties) {
		try {
			this.client.indices.create({
				index,
				body: {
					mappings: {
						...(properties ? { properties } : {})
					}
				}
			});
		} catch (e) {
			console.error(e);
		}
	}

	static insert(index: string, data: any) {
		try {
			const body = {
				index: { _index: index },
				...data
			};
			this.client.index({ index, body });
		} catch (e) {
			console.error(e);
		}
	}

	static async insertBulk(index: string, rawDatas: unknown[]) {
		try {
			const body = rawDatas.flatMap((data: any) => [
				{
					index: { _index: index }
				},
				{ ...(!!data ? data : {}) }
			]);

			const data = await this.client.bulk({ index, body });
			return data;
		} catch (err) {
			console.error(err);
		}
	}

	static async deleteIndex(index: string) {
		try {
			return await this.client.indices.delete({ index });
		} catch (e) {
			console.error(e);
		}
	}

	static emptyIndex(index) {
		try {
			this.deleteIndex(index);
		} catch (e) {
			console.error(e);
		}
	}

	public static async getSuggestion(index: string, body) {
		const data = await this.client.search({
			index,
			body
		});

		return data;
	}

	public static async deleteDoc(index: string, id) {
		try {
			return await this.client.delete_by_query({
				index,
				body: {
					query: {
						match: { id }
					}
				}
			});
		} catch (e) {
			console.error(e);
			return errorResponse();
		}
	}

	// Find the better way to update doc
	/**
	 *
	 * @param index string
	 * @param id number
	 * @param newData Make sure to include all association
	 */
	public static async updateDoc(index: string, id: number, newData) {
		// Remove first
		await this.deleteDoc(index, id);
		const inserted = await this.insertBulk(index, [newData]);

		return inserted;
	}
}

export default OpenSearch;
