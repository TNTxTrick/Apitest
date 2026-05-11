const fs = require('fs-extra');
const path = require('path');
const { info, warning, error } = require('../core/logger'); // nếu bạn dùng logger

const CACHE_DIR = path.join(__dirname, 'public', 'up_dowload', 'cache');

/**
 * Xóa toàn bộ file trong thư mục cache (trừ file được giữ lại)
 */
async function clearCache() {
    try {
        // Kiểm tra folder có tồn tại không
        if (!fs.existsSync(CACHE_DIR)) {
            warning(`Thư mục cache không tồn tại: ${CACHE_DIR}`);
            fs.ensureDirSync(CACHE_DIR); // Tạo folder nếu chưa có
            return;
        }

        const files = await fs.readdir(CACHE_DIR);
        let deletedCount = 0;

        for (const file of files) {
            // Bỏ qua README.txt và các file hệ thống
            if (file === 'README.txt' || file === '.gitkeep') continue;

            const filePath = path.join(CACHE_DIR, file);
            const stat = await fs.stat(filePath);

            if (stat.isFile()) {
                await fs.unlink(filePath);
                deletedCount++;
                info(`Đã xóa cache: ${file}`);
            }
        }

        if (deletedCount > 0) {
            info(`🧹 Đã dọn dẹp cache thành công | Xóa: ${deletedCount} file`);
        } else {
            info('🧹 Cache đã sạch sẽ');
        }

    } catch (err) {
        error('Lỗi khi dọn dẹp cache', err.message);
    }
}

// ====================== EXPORT ======================
module.exports = {
    clearCache,
    CACHE_DIR
};
