module.exports = {
	apps: [
		{
			name: "api",
			script:
				"sudo bash ../ci_scripts/install-dependencies/api.sh && sudo yarn dev",
			max_restarts: 1,
			kill_timeout: 1600,
			autorestart: false,
			error_file: "./.pm2.error.log",
			out_file: "./.pm2.out.log"
		}
	]
};
