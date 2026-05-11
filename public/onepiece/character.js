const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/onepiece/character/:name';
exports.index = async (req, res, next) => {
    let rawName = req.params.name;
    const name = decodeURIComponent(rawName);

    const url = `https://onepiece.fandom.com/vi/wiki/${encodeURIComponent(name)}`;

    try {
        const { data: html } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 15000
        });

        const $ = cheerio.load(html);

        // Tên nhân vật
        const characterName = $('h1.page-header__title').text().trim() || 
                             $('.pi-title').first().text().trim() || 
                             name.replace(/_/g, ' ');

        // Ảnh nhân vật
        let img = $('figure.pi-image img').attr('src') || 
                  $('a.image img').first().attr('src') ||
                  $('meta[property="og:image"]').attr('content');

        if (img && !img.startsWith('http')) img = 'https:' + img;

        // Helper lấy thông tin từ infobox
        const getValue = (label) => {
            return $(`div.pi-data-label:contains("${label}")`).next('.pi-data-value').text().trim() ||
                   $(`th:contains("${label}")`).next('td').text().trim();
        };

        const data = {
            success: true,
            name: characterName,
            url: url,
            image: img,
            japanese_name: getValue('Tên tiếng Nhật') || getValue('Tên romaji'),
            nickname: getValue('Biệt danh'),
            debut: getValue('Xuất hiện lần đầu'),
            faction: getValue('Thuộc phe') || getValue('Phe phái'),
            position: getValue('Chức vụ'),
            age: getValue('Tuổi'),
            birthday: getValue('Sinh nhật'),
            blood_type: getValue('Nhóm máu'),
            height: getValue('Chiều cao'),
            bounty: getValue('Tiền thưởng') || $('span[style*="color:red"]').text().trim(),
            devil_fruit: getValue('Trái ác quỷ'),
            status: getValue('Tình trạng'),
            description: $('div.mw-parser-output p').first().text().trim() || 'Không có mô tả.',
            crawled_at: new Date().toISOString()
        };

        res.json(data);

    } catch (error) {
        console.error('One Piece Character Error:', error.message);

        if (error.response?.status === 404) {
            return res.status(404).json({
                success: false,
                error: 'Không tìm thấy nhân vật',
                message: `Không tồn tại nhân vật: ${name}`
            });
        }

        res.status(500).json({
            success: false,
            error: 'Lỗi khi lấy thông tin nhân vật',
            message: error.message
        });
    }
};
