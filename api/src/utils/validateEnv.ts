import { cleanEnv, str, num } from "envalid";

function getProdEnvRequirement() {
	return {
		PROD_DB_DIALECT: str(),
		PROD_DB_HOST: str(),
		PROD_DB_DATABASE: str(),
		PROD_DB_PORT: num(),
		PROD_DB_USERNAME: str(),
		PROD_DB_PASSWORD: str(),
		PROD_AWS_SECRET_KEY: str(),
		PROD_AWS_ACCESS_KEY: str(),
		PROD_S3_BUCKET_NAME: str()
	};
}

function getDevEnvRequirement() {
	return {
		DEV_DB_DIALECT: str(),
		DEV_DB_HOST: str(),
		DEV_DB_DATABASE: str(),
		DEV_DB_PORT: num(),
		DEV_DB_USERNAME: str(),
		DEV_DB_PASSWORD: str(),
		DEV_AWS_SECRET_KEY: str(),
		DEV_AWS_ACCESS_KEY: str(),
		DEV_S3_BUCKET_NAME: str()
	};
}

export function validateEnv(): void {
	const NODE_ENV = process.env.NODE_ENV;
	cleanEnv(process.env, {
		PORT: num(),
		JWT_SECRET: str(),

		// SMTP
		SMTP_HOST: str(),
		SMTP_PORT: num(),
		SMTP_SECURE: str(),
		SMTP_USERNAME: str(),
		SMTP_PASSWORD: str(),
		SMTP_FROM: str(),

		// AWS
		AWS_REGION: str(),

		...(NODE_ENV !== "production" ? getDevEnvRequirement() : {}),
		...(NODE_ENV === "production" ? getProdEnvRequirement() : {})
	});
}
