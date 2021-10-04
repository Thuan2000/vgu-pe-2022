import { siteSettings } from "../settings/site.settings";

export function generateHeadTitle(page: string): string {
	return `${siteSettings.appName} | ${page}`;
}
