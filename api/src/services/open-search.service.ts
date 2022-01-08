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
		this.client.indices.create({
			index,
			body: {
				mappings: {
					...(properties ? { properties } : {})
				}
			}
		});
	}

	static insert(index: string, data: any) {
		try {
			const body = {
				index: { _index: index },
				...data
			};
			this.client.index({ index, body });
		} catch (e) {
			console.log(e);
		}
	}

	static insertBulk(index: string, rawDatas: unknown[]) {
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const body = rawDatas.flatMap((data: any) => [
				{
					index: { _index: index }
				},
				{ ...(!!data ? data : {}) }
			]);

			this.client.bulk({ index, body });
		} catch (err) {
			console.log(err);
		}
	}

	static deleteIndex(index: string) {
		this.client.indices.delete({ index });
	}

	static emptyIndex(index) {
		this.deleteIndex(index);
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
			await this.client.delete_by_query({
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
		this.deleteDoc(index, id);

		this.insertBulk(index, [newData]);
	}
}

export default OpenSearch;
