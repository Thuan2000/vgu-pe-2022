import { cleanEnv, str, num } from "envalid";

export function validateEnv(): void {
	const NODE_ENV = process.env.NODE_ENV;
	cleanEnv(process.env, {
		PORT: num(),
		JWT_SECRET: str(),

		// DB
		DB_DIALECT: str(),
		DB_HOST: str(),
		DB_DATABASE: str(),
		DB_PORT: num(),
		DB_USERNAME: str(),
		DB_PASSWORD: str(),

		// SMTP
		SMTP_HOST: str(),
		SMTP_PORT: num(),
		SMTP_SECURE: str(),
		SMTP_USERNAME: str(),
		SMTP_PASSWORD: str(),
		SMTP_FROM: str(),

		// AWS
		AWS_REGION: str(),
		AWS_SECRET_KEY: str(),
		AWS_ACCESS_KEY: str(),

		// S3
		S3_BUCKET_NAME: str()
	});
}
