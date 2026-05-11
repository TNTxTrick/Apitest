const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/honkai/list_character';
exports.index = async (req, res, next) => {
    try {
        // Trang Danh sách Nhân Vật tốt nhất
        const url = 'https://honkai-star-rail.fandom.com/vi/wiki/Nh%C3%A2n_V%E1%BA%ADt/Danh_S%C3%A1ch';

        const { data: html } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 15000
        });

        const $ = cheerio.load(html);
        const characters = [];

        // Lấy danh sách nhân vật từ bảng hoặc thẻ a trong khu vực nhân vật
        $('table tr td:first-child a, .mw-parser-output a[title]').each((i, el) => {
            const name = $(el).text().trim();
            const link = 'https://honkai-star-rail.fandom.com' + $(el).attr('href');

            if (name && name.length > 1 && !characters.includes(name)) {
                // Lọc bỏ các link không phải nhân vật
                if (!['Danh sách', 'Nhân vật', 'Phiên bản'].some(ex => name.includes(ex))) {
                    characters.push({
                        name: name,
                        url: link
                    });
                }
            }
        });

        // Cách 2: Lấy từ dòng text danh sách (dự phòng)
        if (characters.length < 10) {
            const textBlock = $('td').text();
            const nameList = textBlock.match(/[A-Za-zÀ-ỹẦ-ỹ\s]+(?=\s+[A-ZÀ-Ỹ])/g) || [];
            nameList.forEach(name => {
                const cleanName = name.trim();
                if (cleanName.length > 2 && !characters.some(c => c.name === cleanName)) {
                    characters.push({ name: cleanName });
                }
            });
        }

        res.json({
            success: true,
            total: characters.length,
            characters: characters,
            updated_at: new Date().toISOString()
        });

    } catch (error) {
        console.error('Honkai Crawl Error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Không thể lấy danh sách nhân vật',
            message: error.message
        });
    }
};
