const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/onepiece/list_character';
exports.index = async (req, res, next) => {
    const url = 'https://onepiece.fandom.com/vi/wiki/Thể_loại:Nhân_vật';

    try {
        const { data: html } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 15000
        });

        const $ = cheerio.load(html);
        const characters = [];

        // Lấy tất cả link nhân vật trong category
        $('a.category-page__member-link').each((i, el) => {
            const name = $(el).text().trim();
            const link = 'https://onepiece.fandom.com' + $(el).attr('href');

            if (name && name.length > 1) {
                characters.push({
                    name: name,
                    url: link
                });
            }
        });

        // Nếu không lấy được (do wiki thay đổi), fallback cách khác
        if (characters.length === 0) {
            $('a[href*="/wiki/"]').each((i, el) => {
                const name = $(el).text().trim();
                const href = $(el).attr('href');

                if (name && href && !href.includes('Thể_loại') && name.length > 2) {
                    // Lọc bớt link không phải nhân vật
                    if (!['Chỉnh sửa', 'Thảo luận', 'Đăng nhập'].some(t => name.includes(t))) {
                        characters.push({
                            name: name,
                            url: 'https://onepiece.fandom.com' + href
                        });
                    }
                }
            });
        }

        // Loại bỏ trùng lặp
        const uniqueCharacters = characters.filter((v, i, a) => 
            a.findIndex(t => t.name === v.name) === i
        );

        res.json({
            success: true,
            total: uniqueCharacters.length,
            characters: uniqueCharacters,
            crawled_at: new Date().toISOString()
        });

    } catch (error) {
        console.error('One Piece List Character Error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Không thể lấy danh sách nhân vật One Piece',
            message: error.message
        });
    }
};
