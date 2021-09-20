module.exports = {
	apps: [
		{
			name: "shop",
			script: "sudo bash ../../ci_scripts/install-dependencies/shop.sh && yarn start",
			max_restarts: 1,
			kill_timeout: 1600,
			autorestart: false
		}
	]
};
