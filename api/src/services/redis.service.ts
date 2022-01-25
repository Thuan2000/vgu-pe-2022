import redis from "async-redis";
import { RedisClient } from "redis";

class RedisService {
	private static client: RedisClient = (redis as any).createClient({
		url: process.env.REDIS_URL
	});

	/**
	 *
	 * @param key Redis record key
	 * @param value Redis record value
	 * @param exp Time to expire in seconds
	 */
	static save(key: string, value: string, exp?) {
		this.client.set(key, value, !!exp ? "EX" : "", !!exp ? exp : "");
	}

	static async get(key) {
		return await this.client.get(key);
	}

	static remove(key) {
		this.client.del(key);
	}
}

export default RedisService;
