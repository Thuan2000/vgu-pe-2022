function withOpacity(variableName) {
	return ({ opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${variableName}), ${opacityValue})`;
		} else {
			return `rgb(var(${variableName}))`;
		}
	};
}

module.exports = {
	mode: "jit",
	purge: {
		content: ["./src/**/*.{js,ts,jsx,tsx}"]
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			screens: {
				"3xl": "1900px"
			},
			fontFamily: {
				body: ["Open Sans", "system-ui", "sans-serif"],
				heading: ["Open Sans", "system-ui", "sans-serif"]
			},
			colors: {
				light: withOpacity("--color-light"),
				dark: withOpacity("--color-dark"),
				accent: withOpacity("--color-accent"),
				"green-main": "#00D796",
				"green-hover": "#02BF86",
				"blue-secondary": "#349EFF"
			},

			textColor: {
				body: withOpacity("--text-base"),
				"body-dark": withOpacity("--text-base-dark"),
				muted: withOpacity("--text-muted"),
				"muted-light": withOpacity("--text-muted-light"),
				heading: withOpacity("--text-heading"),
				"sub-heading": withOpacity("--text-sub-heading"),
				bolder: withOpacity("--text-text-bolder")
			},

			height: {
				13: "3.125rem",
				double: "200%"
			},
			maxWidth: {
				5: "1.25rem"
			},
			maxHeight: {
				5: "1.25rem"
			},
			spacing: {
				22: "5.5rem"
			},

			borderRadius: {
				DEFAULT: "5px"
			},

			boxShadow: {
				base: "rgba(0, 0, 0, 0.16) 0px 4px 16px"
			},

			gridTemplateColumns: {
				fit: "repeat(auto-fit, minmax(0, 1fr))"
			}
		}
	},
	plugins: [require("tailwindcss-rtl")]
};
