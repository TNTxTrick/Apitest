'use strict';

const colors = {
    RESET: '\x1b[0m',
    INFO: '\x1b[36m',      // Cyan
    SUCCESS: '\x1b[32m',   // Green
    WARNING: '\x1b[33m',   // Yellow
    ERROR: '\x1b[31m',     // Red
    DEBUG: '\x1b[35m',     // Purple
    REQUEST: '\x1b[38;5;51m' // Light blue
};

/**
 * Logger chính
 */
const log = (message, type = 'INFO', data = null) => {
    const timestamp = new Date().toLocaleTimeString('vi-VN');
    const color = colors[type.toUpperCase()] || colors.INFO;

    let output = `${colors.RESET}[${timestamp}] ${color}[${type.toUpperCase()}]${colors.RESET} → ${message}`;

    if (data !== null) {
        if (typeof data === 'object') {
            console.log(output);
            console.dir(data, { depth: null, colors: true });
        } else {
            output += ` - ${data}`;
            console.log(output);
        }
    } else {
        console.log(output);
    }
};

// Các hàm tiện ích
exports.info = (message, data) => log(message, 'INFO', data);
exports.success = (message, data) => log(message, 'SUCCESS', data);
exports.warning = (message, data) => log(message, 'WARNING', data);
exports.error = (message, data) => log(message, 'ERROR', data);
exports.debug = (message, data) => log(message, 'DEBUG', data);
exports.request = (message, data) => log(message, 'REQUEST', data);

// Error handler cho middleware (next)
exports.throwError = (next, message, status = 500) => {
    const err = new Error(message);
    err.status = status;
    next(err);
};

// Log request IP
exports.logRequest = (req) => {
    const getIP = require('ipware')().get_ip;
    const ipInfo = getIP(req);
    const ip = ipInfo.clientIp || 'Unknown';

    const message = `${req.method} ${decodeURIComponent(req.url)}`;
    log(message, 'REQUEST', `IP: ${ip}`);
};

module.exports = exports;
