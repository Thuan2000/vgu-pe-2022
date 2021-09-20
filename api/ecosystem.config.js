module.exports = {
	apps: [
		{
			name: "api",
			script:
				"sudo bash ../ci_scripts/install-dependencies/api.sh && yarn dev",
			max_restarts: 1,
			kill_timeout: 1600,
			autorestart: false
		}
	]
};
