const path = require("path");

module.exports = {
	i18n: {
		locales: ["en", "vi"],
		defaultLocale: "vi"
	},
	localePath: path.resolve("./public/locales")
};
