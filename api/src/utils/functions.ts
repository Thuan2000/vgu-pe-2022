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

export function generateSlug(companyName: string) {
	const slug = companyName.toLowerCase().replace(" ", "-");
	return slug;
}

export function checkTableName(tableName: string) {
	if (!tableName) {
		throw "NO_TABLE_NAME_EXCEPTION";
	}
}
