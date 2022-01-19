// Helper functions for storing values in localStorage.
// By default localStorage can store only strings, not objects or other types.

import Cookies from "js-cookie";

export default class LocalStorageUtil {
  // Replace old object with the new one.
  static setObject(key, value) {
    Cookies.set(key, JSON.stringify(value), { domain: ".sdconnect.vn" });
  }

  // Get stored object.
  static getObject(key) {
    const value = Cookies.get(key, { domain: ".sdconnect.vn" });
    if (!value) return false;
    return value && JSON.parse(value);
  }

  // Partially or wholly update stored object.
  static updateObject(key, value) {
    const oldVal = this.getObject(key);
    this.setObject(key, Object.assign(oldVal || {}, value));
  }

  // Just a wrapper.
  static removeItem(key) {
    Cookies.remove(key);
  }
}
