const fs = require("fs");
const os = require("os");
const path = require("path");

const envExampleFilePath = path.resolve(__dirname, "env.example");
const envFilePath = path.resolve(__dirname, ".env");

const devUrlValues = {
  NEXT_PUBLIC_GRAPHQL_ENDPOINT: "https://api.dev.sdconnect.vn/graphql",
  NEXT_PUBLIC_ADMIN_URL: "https://admin.dev.sdconnect.vn",
  NEXT_PUBLIC_CHAT_SERVER_URL: "wss://chat.dev.sdconnect.vn/v0/channels",
  NEXT_PUBLIC_CHAT_SERVER_API_KEY: "AQEAAAABAAD_rAp4DJh05a1HAwFT3A6K",
  NEXTAUTH_URL: "dev.sdconnect.vn",
};

const prodUrlValues = {
  NEXT_PUBLIC_GRAPHQL_ENDPOINT: "https://api.sdconnect.vn/graphql",
  NEXT_PUBLIC_ADMIN_URL: "https://admin.sdconnect.vn",
  NEXT_PUBLIC_CHAT_SERVER_URL: "wss://chat.sdconnect.vn/v0/channels",
  NEXT_PUBLIC_CHAT_SERVER_API_KEY: "AQEAAAABAAD_rAp4DJh05a1HAwFT3A6K",
  NEXTAUTH_URL: "sdconnect.vn",
};

// read .env file & convert to array
const readEnvVars = () =>
  fs.readFileSync(envExampleFilePath, "utf-8").split(os.EOL);

const envVars = readEnvVars();
/**
 * Finds the key in .env files and returns the corresponding value
 *
 * @param {string} key Key to find
 * @returns {string|null} Value of the key
 */
const getEnvValue = (key) => {
  // find the line that contains the key (exact match)
  const matchedLine = readEnvVars().find((line) => line.split("=")[0] === key);
  // split the line (delimiter is '=') and return the item at index 2
  return matchedLine !== undefined ? matchedLine.split("=")[1] : null;
};

/**
 * Updates value for existing key or creates a new key=value line
 *
 * This function is a modified version of https://stackoverflow.com/a/65001580/3153583
 *
 * @param {string} key Key to update/insert
 * @param {string} value Value to update/insert
 */
const setEnvValue = (key, value) => {
  // const envVars = readEnvVars();
  const targetLine = envVars.find((line) => line.split("=")[0] === key);
  if (targetLine !== undefined) {
    // update existing line
    const targetLineIndex = envVars.indexOf(targetLine);
    // replace the key/value with the new value
    envVars.splice(targetLineIndex, 1, `${key}="${value}"`);
  } else {
    // create new key value
    envVars.push(`${key}="${value}"`);
  }
  // write everything back to the file system
  fs.writeFileSync(envFilePath, envVars.join(os.EOL));
};

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === "prod";

Object.keys(devUrlValues).forEach((k, idx) => {
  const value = isProd ? prodUrlValues[k] : devUrlValues[k];

  // setTimeout(() => setEnvValue(k, value), 1000 * idx);
  setEnvValue(k, value);
});
