// Helper functions for storing values in localStorage.
// By default localStorage can store only strings, not objects or other types.

import Cookies from "js-cookie";
import { DOMAIN_NAME } from "../../.env";

export const AUTH_TOKEN_NAME = "auth-token";
export const AUTH_CRED = "AUTH_CRED";

export function getDomain() {
  return { domain: DOMAIN_NAME };
}

export default class CookieUtil {
  // Replace old object with the new one.
  static setObject(key, value) {
    Cookies.set(key, JSON.stringify(value), getDomain());
  }

  // Get stored object.
  static getObject(key) {
    const value = Cookies.get(key, getDomain());
    if (!value) return false;
    return value && JSON.parse(value);
  }

  // Partially or wholly update stored object.
  static updateObject(key, value) {
    const oldVal = this.getObject(key, getDomain());
    this.setObject(key, Object.assign(oldVal || {}, value), getDomain());
  }

  // Just a wrapper.
  static removeItem(key) {
    Cookies.remove(key, getDomain());
  }
}
