module.exports = {
  apps: [
    {
      name: "api",
      cwd: "./api",
      script:
        "sudo bash ../ci_scripts/install-dependencies/api.sh && sudo yarn start",
      max_restarts: 1,
      kill_timeout: 1600,
      autorestart: false,
      error_file: "./.pm2error.log",
      out_file: "./.pm2out.log",
    },
    {
      name: "shop",
      cwd: "./frontend/shop",
      script:
        "sudo bash ../../ci_scripts/install-dependencies/shop.sh && sudo yarn start",
      max_restarts: 1,
      kill_timeout: 1600,
      autorestart: true,
      // 5 Minutes
      restart_delay: 180000,
      error_file: "./.pm2error.log",
      out_file: "./.pm2out.log",
    },
    {
      name: "admin",
      cwd: "./frontend/admin",
      script:
        "sudo bash ../../ci_scripts/install-dependencies/admin.sh && sudo yarn start",
      max_restarts: 1,
      kill_timeout: 1600,
      autorestart: true,
      // 5 Minutes
      restart_delay: 180000,
      error_file: "./.pm2error.log",
      out_file: "./.pm2out.log",
    },
  ],
};
