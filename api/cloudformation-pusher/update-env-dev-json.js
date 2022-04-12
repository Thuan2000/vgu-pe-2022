// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
const refresherParamaterKey = "Refresher";
const filePath = "env-dev.json";

// read file and make object
const content = JSON.parse(fs.readFileSync(filePath, "utf8"));

/**
 * Get the new refresher value
 * @param  c
 * @returns
 */
function getUpdatedRefresherValue(c) {
	let currentParameterValue = c.ParameterValue;
	if (typeof currentParameterValue === "string")
		currentParameterValue = parseInt(currentParameterValue);

	if (isNaN(currentParameterValue)) {
		currentParameterValue = 0;
	}
	return currentParameterValue + 1;
}

const updatedContent = content.map(c => {
	if (c.ParameterKey === refresherParamaterKey) {
		c.ParameterValue = getUpdatedRefresherValue(c);
	}

	return c;
});

console.log(updatedContent);

fs.writeFileSync(filePath, JSON.stringify(updatedContent, null, 2));
