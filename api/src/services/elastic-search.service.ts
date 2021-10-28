/* eslint-disable @typescript-eslint/interface-name-prefix */
import { Client } from "@elastic/elasticsearch";

interface IMappingProperties {
	[key: string]: {
		type: string;
	};
}

class ElasticSearch {
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
				// settings: {

				// }
			}
		});
	}

	static insertBulk(index: string, rawDatas: unknown[]) {
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const body = rawDatas.flatMap((data: any) => [
				{
					index: { _index: index }
				},
				{ ...(data ? data : {}) }
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
		setTimeout(() => this.createIndex(index), 5000);
	}

	public static async getSuggestion(index: string, body) {
		const data = await this.client.search({
			index,
			body
		});

		return data;
	}
}

export default ElasticSearch;
