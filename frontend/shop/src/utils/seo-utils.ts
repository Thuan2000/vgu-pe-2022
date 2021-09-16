import { APP_NAME } from "../settings/site.settings";

export function generateHeadTitle(page: string): string {
	return `${APP_NAME} | ${page}`;
}
