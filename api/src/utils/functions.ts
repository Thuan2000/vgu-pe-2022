/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */

import jwt from "jsonwebtoken";
import utf8 from "utf8";
import base64 from "base-64";
import { SLUG_UNIQUE_SEPARATOR } from ".";

export function generateDate(): string {
	const date = new Date();
	const [day, month, year] = [
		date.getDate(),
		date.getMonth() + 1,
		date.getFullYear()
	];

	return `${day < 10 ? `0${day}` : day}-${
		month < 10 ? `0${month}` : month
	}-${year}`;
}

export function handleError(err) {
	if (err) {
		console.log(err);
		throw err;
	}
}

// NEED_REVIEW: add a 4-digit random hash to avoid name collisions.
export function generateSlug(name: string, id: number) {
	let uniqueKey = `${id}`;
	if (id < 10) uniqueKey = `000${id}`;
	else if (id < 100) uniqueKey = `00${id}`;
	else if (id < 1000) uniqueKey = `0${id}`;

	const slug = name.toLowerCase().replace(/\ /g, "-");
	return `${slug}${SLUG_UNIQUE_SEPARATOR}${uniqueKey}`;
}

export function checkTableName(tableName: string) {
	if (!tableName) {
		throw "NO_TABLE_NAME_EXCEPTION";
	}
}

export function getUserName(user) {
	const name = `${user.firstName} ${user.lastName}`;
	return name;
}

export function getUserFromToken(token) {
	if (!token) return null;
	const authToken = token.split(" ")[1];
	const user = jwt.verify(authToken, process.env.JWT_SECRET);
	return user;
}

export function generateUUID() {
	let d = new Date().getTime(); //Timestamp
	let d2 =
		(typeof performance !== "undefined" &&
			performance.now &&
			performance.now() * 1000) ||
		0; //Time in microseconds since page-load or 0 if unsupported
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		let r = Math.random() * 16; //random number between 0 and 16
		if (d > 0) {
			//Use timestamp until depleted
			r = (d + r) % 16 | 0;
			d = Math.floor(d / 16);
		} else {
			//Use microseconds since page-load if supported
			r = (d2 + r) % 16 | 0;
			d2 = Math.floor(d2 / 16);
		}
		return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
	});
}

function __undefinedPropertiesObj(obj) {
	let isAllUndefined = true;
	Object.keys(obj).forEach(k => {
		if (!!obj[k]) isAllUndefined = false;
	});
	return isAllUndefined;
}

export function isEmptyObject(obj) {
	if (!Object.keys(obj).length) return true;

	return __undefinedPropertiesObj(obj);
}

export function encodeString(text: string) {
	const b64Encoded = base64.encode(text);

	return b64Encoded;
}

export function decodeString(text: string) {
	const b64Decoded = base64.decode(text);

	return b64Decoded;
}

export function generateChatPassword(password: string) {
	const splitted = password.split("@");
	const userName = `${splitted?.[0]}`;

	return userName;
}
export function generateUsername(email: string) {
	const splitted = email.split("@");
	const userName = `${splitted?.[0]}`;

	return userName;
}

/**
 * get the current date of the server when this function is fired and convert it into ms
 * @returns Current date in miliseconds
 */
export function getCurrentDateInMilis() {
	return new Date().getTime();
}

/**
 * Generates the 8-character first-time login password.
 * @param length: number - 8 by default.
 */
export function generateFirstTimePassword(length = 8) {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const totalLength = characters.length;

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * totalLength));
	}

	return result;
}

/**
 * Normalize the string with special anotation
 * @param str
 * @returns normalized string
 */
export function normalizeString(str: string) {
	if (!str) return "";
	const normalized = str.normalize("NFD")?.replace(/[\u0300-\u037f]/g, "");
	return normalized.replace(/[^a-zA-Z0-9]/g, "");
}

// NOTE!!! If you edit this please edit on shop, mobile, as well same name function
/**
 * Using the company name and company Id on the database to have a chat credential
 * No more idea yet
 * @param compName company name
 * @param compId company id
 * @returns
 */
export function generateChatCredUnique(compName: string, compId: number) {
	return normalizeString(`${compName}${compId}`)
		.replace(/[ ]/g, "")
		.slice(-25);
}
