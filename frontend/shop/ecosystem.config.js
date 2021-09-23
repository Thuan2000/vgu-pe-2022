module.exports = {
	apps: [
		{
			name: "shop",
			script: "sudo bash ../../ci_scripts/install-dependencies/shop.sh && sudo yarn start",
			max_restarts: 1,
			kill_timeout: 1600,
			autorestart: false,
			error_file: "./.pm2.error.log",
			out_file: "./.pm2.out.log"
		}
	]
};
