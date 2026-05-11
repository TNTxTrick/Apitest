// src/routes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const { logSuccess, logError } = require('./core/logger'); // mình sẽ viết sau

let loadedCount = 0;

/**
 * Hàm load tất cả API từ một thư mục
 * @param {string} baseDir 
 * @param {string} method 
 */
function loadRoutesFromDir(baseDir, method = 'get') {
    if (!fs.existsSync(baseDir)) return;

    const items = fs.readdirSync(baseDir);

    for (const item of items) {
        const fullPath = path.join(baseDir, item);
        const stat = fs.statSync(fullPath);

        try {
            if (stat.isDirectory()) {
                // Load subfolder
                loadRoutesFromDir(fullPath, method);
            } 
            else if (item.endsWith('.js')) {
                const module = require(fullPath);
                
                if (module.index && module.name) {
                    const routePath = module.name.startsWith('/') ? module.name : '/' + module.name;
                    
                    if (method === 'post') {
                        router.post(routePath, module.index);
                    } else {
                        router.get(routePath, module.index);
                    }

                    loadedCount++;
                    logSuccess(`[${method.toUpperCase()}] Đã load → ${routePath} (${item})`);
                }
            }
        } catch (error) {
            logError(`Lỗi load ${item}: ${error.message}`);
        }
    }
}

// ====================== LOAD ROUTES ======================

console.log('\n🔄 Đang load tất cả APIs...');

// Load GET routes từ folder public
loadRoutesFromDir(path.join(__dirname, 'public'));

// Load POST routes từ folder post  
loadRoutesFromDir(path.join(__dirname, 'post'), 'post');

// Load thêm nếu bạn có folder con đặc biệt
// loadRoutesFromDir(path.join(__dirname, 'apis/lienquan'), 'get');

console.log(`\n✅ Đã load thành công ${loadedCount} API routes\n`);

module.exports = router;
