import { MOBILE_SIZE } from "./constants";

export function checkIsMobile(width: number) {
	return width >= MOBILE_SIZE.min && width <= MOBILE_SIZE.max;
}
