'use strict';
const startTime = Date.now();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// ====================== CONFIG ======================
const blockedIPsPath = path.join(__dirname, 'blockedIP.json');
let blockedIPs = fs.existsSync(blockedIPsPath) 
    ? JSON.parse(fs.readFileSync(blockedIPsPath, 'utf-8')) 
    : [];

// ====================== MIDDLEWARES ======================
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate Limit + Auto Block IP
const rateLimit = require('express-rate-limit');
const getIP = require('ipware')().get_ip;

const rateLimiter = rateLimit({
    windowMs: 60 * 1000,        // 1 phút
    max: 650,                   // tối đa 650 requests/phút
    handler: (req, res, next) => {
        const ipInfo = getIP(req);
        const ip = ipInfo.clientIp;

        if (!blockedIPs.includes(ip)) {
            blockedIPs.push(ip);
            fs.writeFileSync(blockedIPsPath, JSON.stringify(blockedIPs, null, 2));
            console.log(`[🚫 BLOCKED] IP: ${ip} (Rate Limit Exceeded)`);
        }
        next(); // vẫn cho qua hoặc bạn có thể res.status(429).json(...)
    }
});

app.use(rateLimiter);

// Check IP Blocked Middleware
app.use((req, res, next) => {
    const ipInfo = getIP(req);
    const ip = ipInfo.clientIp;

    if (blockedIPs.includes(ip)) {
        return res.status(403).json({
            success: false,
            error: 'Your IP has been blocked'
        });
    }
    next();
});

// ====================== LOGGING IP ======================
app.use((req, res, next) => {
    const ipInfo = getIP(req);
    const colors = ["\x1b[31m", "\x1b[32m", "\x1b[33m", "\x1b[34m", "\x1b[35m", "\x1b[36m", "\x1b[38;5;205m", "\x1b[38;5;51m", "\x1b[38;5;197m"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    console.log(color + `[ IP ] → ${ipInfo.clientIp} ${req.method} ${decodeURIComponent(req.url)}`);
    next();
});

// ====================== ROUTES ======================
const mainRouter = require('./src/routes');   // Router auto load bạn đã có
app.use('/', mainRouter);

// Dashboard
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ====================== ERROR HANDLING ======================
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: error.message
    });
});

// ====================== START SERVER ======================
app.listen(PORT, () => {
    const loadTime = (Date.now() - startTime) / 1000;
    
    console.log('\x1b[36m' + '='.repeat(60));
    console.log(`\x1b[38;5;220m[ START ] \x1b[33m→\x1b[38;5;119m Server TNT đang chạy trên PORT \x1b[38;5;208m${PORT}`);
    console.log(`\x1b[38;5;220m[ LOADING ] \x1b[33m→\x1b[35m Thời gian khởi động: ${loadTime.toFixed(2)} giây`);
    console.log('\x1b[38;5;205m[ RAIDEN API ] \x1b[33m→\x1b[38;5;51m Khởi động thành công!');
    console.log('\x1b[36m' + '='.repeat(60) + '\x1b[0m');
});

// ====================== BANKING SYSTEM ======================
async function startBanking() {
    const { join } = require('path');
    const bankPath = join(__dirname, 'public', 'bank', 'data', 'bank.json');

    if (!fs.existsSync(bankPath)) return console.log('[ BANK ] File bank.json không tồn tại');

    console.log('\x1b[38;5;220m[ BANKING ] \x1b[33m→ Hệ thống ngân hàng đã kích hoạt');

    while (true) {
        try {
            let users = JSON.parse(fs.readFileSync(bankPath, 'utf-8'));
            
            for (let user of users) {
                if (user?.data?.money) {
                    user.data.money = Math.floor(user.data.money * 1.005); // +0.5%
                }
            }

            fs.writeFileSync(bankPath, JSON.stringify(users, null, 2));
            console.log(`\x1b[38;5;220m[ BANK ] \x1b[33m→ Đã cộng lãi thành công`);
        } catch (e) {
            console.error('[ BANK ERROR ]', e.message);
        }

        await new Promise(resolve => setTimeout(resolve, 60 * 60 * 1000)); // 1 giờ
    }
}

startBanking();

module.exports = app;   // nếu cần export---------------------------//
