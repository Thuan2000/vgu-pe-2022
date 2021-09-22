import { cleanEnv, str, num } from "envalid";

export function validateEnv(): void {
	cleanEnv(process.env, {
		PORT: num(),
		JWT_SECRET: str(),
		// Dev DB
		DEV_DB_DIALECT: str(),
		DEV_DB_HOST: str(),
		DEV_DB_DATABASE: str(),
		DEV_DB_PORT: num(),
		DEV_DB_USERNAME: str(),
		DEV_DB_PASSWORD: str(),
		// PROD DB
		PROD_DB_DIALECT: str(),
		PROD_DB_HOST: str(),
		PROD_DB_DATABASE: str(),
		PROD_DB_PORT: num(),
		PROD_DB_USERNAME: str(),
		PROD_DB_PASSWORD: str(),
		// AWS
		AWS_REGION: str(),
		DEV_AWS_SECRET_KEY: str(),
		DEV_AWS_ACCESS_KEY: str(),
		PROD_AWS_SECRET_KEY: str(),
		PROD_AWS_ACCESS_KEY: str(),
		// S3
		PROD_S3_BUCKET_NAME: str(),
		DEV_S3_BUCKET_NAME: str(),
		// SMTP
		SMTP_HOST: str(),
		SMTP_PORT: num(),
		SMTP_SECURE: str(),
		SMTP_USERNAME: str(),
		SMTP_PASSWORD: str(),
		SMTP_FROM: str()
	});
}
