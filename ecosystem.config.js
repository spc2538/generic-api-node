const config = require("./config");

module.exports = {
    apps: [
        {
            name: config.SERVICE_ALIAS,
            script: "app.js",
            autorestart: true,
            max_restarts: 1,
            restart_delay: 1000,
            log_date_format: "YYYY-MM-DD HH:mm:ss Z",
            error_file: config.PM2_LOGS,
            out_file: config.PM2_LOGS,
            watch: true,
            ignore_watch: [
                "logs",
                "uploads",
                "views",
                "README.md",
                "docs",
            ],
            watch_options: {
                followSymlinks: false,
            },
        },
    ],
};
