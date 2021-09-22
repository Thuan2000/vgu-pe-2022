export enum ENODE_ENV {
	DEVELOPMENT = "development",
	PRODUCTION = "production"
}

export const NODE_ENV: ENODE_ENV =
	(process.env.NODE_ENV as ENODE_ENV) ?? ENODE_ENV.DEVELOPMENT;
