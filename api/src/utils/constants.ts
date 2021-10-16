export enum ENODE_ENV {
	DEVELOPMENT = "development",
	PRODUCTION = "production"
}

export const NODE_ENV: ENODE_ENV =
	(process.env.NODE_ENV as ENODE_ENV) ?? ENODE_ENV.DEVELOPMENT;

export const AUTH_CONSTANTS = {
	AUTH_CONSTANT_KEY: "auth_token"
};

export const BUYING_REQUESTS_GET_LIMIT = 8;
export const PROJECTS_GET_LIMIT = 15;

export const RESPONSE_MESSAGE = {
	DUPLICATE: "DUPLICATE",
	SUCCESS: "SUCCESS"
};
