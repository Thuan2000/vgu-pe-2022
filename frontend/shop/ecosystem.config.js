module.exports = {
	apps: [
		{
			name: "shop",
			script: "sudo bash ../../ci_scripts/install-dependencies/shop.sh && sudo yarn start",
			max_restarts: 1,
			kill_timeout: 1600,
			autorestart: false
		}
	]
};
