import jwt from "jsonwebtoken";
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

// @TODO: Check this since it's from stackoverflow
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
