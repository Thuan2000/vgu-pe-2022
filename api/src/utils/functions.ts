import jwt from "jsonwebtoken";

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
export function generateSlug(name: string, id?: number) {
	let uniqueKey = `${id}`;
	if (id < 10) uniqueKey = `000${id}`;
	if (id < 100) uniqueKey = `00${id}`;
	if (id < 1000) uniqueKey = `0${id}`;

	const slug = name.toLowerCase().replace(/\ /g, "-");
	return `${slug}#${uniqueKey}`;
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
