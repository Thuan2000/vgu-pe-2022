import { MOBILE_SIZE } from "./constants";

export function checkIsMobile(width: number) {
  return width >= MOBILE_SIZE.min && width <= MOBILE_SIZE.max;
}

export function trimText(text: string, limit: number) {
  if (!text) return "";
  if (text.length < limit) return text;

  return `${text.substring(0, limit)}...`;
}
