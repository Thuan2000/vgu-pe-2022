import { cleanEnv, str, num } from "envalid";

export function validateEnv(): void {
	cleanEnv(process.env, {
		PORT: num(),
		JWT_SECRET: str(),
		DB_HOST: str(),
		DB_PORT: num(),
		DB_USERNAME: str(),
		DB_PASSWORD: str()
	});
}
