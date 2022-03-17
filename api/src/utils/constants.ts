export const SLUG_UNIQUE_SEPARATOR = "_";
export const TRIAL_SUBSCRIPTION_ID = 1;
export const HOUR_IN_SECONDS = 3600;
export const MONTH_IN_MS = 2629800000;

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

export const MAX_IMAGE_WIDTH = 2560;
export const MAX_IMAGE_HEIGHT = 1440;

export const THUMB_IMAGE_WIDTH = 1920;
export const THUMB_IMAGE_HEIGHT = 1080;
