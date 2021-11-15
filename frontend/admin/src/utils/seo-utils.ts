import { siteSettings } from "../settings/site.settings";

export function generateHeadTitle(page: string): string {
  return `${siteSettings.appName} | ${page}`;
}

export function generatePageDescription(description: string): string {
  return `${siteSettings.appName} | ${description}`;
}
