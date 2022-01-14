import { SERVER_URL } from "../../.env";

// Detect server address from the URL
export function detectServerAddress() {
  return SERVER_URL;
}

// Detect if the page is served over HTTPS.
export function isSecureConnection() {
  if (typeof window.location == "object") {
    return window.location.protocol == "https:";
  }
  return false;
}

export function isLocalHost() {
  if (typeof window.location == "object") {
    return window.location.hostname == "localhost";
  }
  return false;
}
