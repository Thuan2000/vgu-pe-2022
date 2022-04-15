// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
const refresherParamaterKey = "Refresher";

const dbUsernameParamKey = "DBUsername";
const dbPassParamKey = "DBPassword";
const dbNameParamKey = "DBDatabase";

// TODO: Get this from website
const dbUsernameParamaterVal = "admin";
const dbPassParamaterVal = "DatabasePassword-123";
const dbNameParamaterVal = "sdconnect";

const filePath = "env-prod.json";

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
	return currentParameterValue + 1 + "";
}

const updatedContent = content.map(c => {
	if (c.ParameterKey === refresherParamaterKey) {
		c.ParameterValue = getUpdatedRefresherValue(c);
	} else if (c.ParameterKey === dbUsernameParamKey) {
		c.ParameterValue = dbUsernameParamaterVal;
	} else if (c.ParameterKey === dbPassParamKey) {
		c.ParameterValue = dbPassParamaterVal;
	} else if (c.ParameterKey === dbNameParamKey) {
		c.ParameterValue = dbNameParamaterVal;
	}

	return c;
});

fs.writeFileSync(filePath, JSON.stringify(updatedContent, null, 2));
