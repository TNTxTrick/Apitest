const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/honkai/character/:name';
exports.index = async (req, res, next) => {
    const rawName = req.params.name;
    const name = decodeURIComponent(rawName); // Xử lý tên có dấu cách, ký tự đặc biệt

    const url = `https://honkai-star-rail.fandom.com/vi/wiki/${encodeURIComponent(name)}`;

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
                             name;

        // Ảnh chính (Splash Art)
        let img = $('figure.pi-image img').attr('src') || 
                  $('a.image img').first().attr('src') ||
                  $('meta[property="og:image"]').attr('content');

        if (img && !img.startsWith('http')) img = 'https:' + img;

        // Thông tin từ Infobox
        const getInfoboxValue = (label) => {
            return $(`div.pi-data-label:contains("${label}")`).next('.pi-data-value').text().trim();
        };

        const data = {
            success: true,
            name: characterName,
            url: url,
            image: img,
            rarity: getInfoboxValue('Độ hiếm') || getInfoboxValue('Rare'),
            path: getInfoboxValue('Vận mệnh') || getInfoboxValue('Path'),
            element: getInfoboxValue('Thuộc tính') || getInfoboxValue('Combat Type'),
            real_name: getInfoboxValue('Tên thật') || getInfoboxValue('Real Name'),
            species: getInfoboxValue('Loài') || getInfoboxValue('Species'),
            faction: getInfoboxValue('Thuộc phe') || getInfoboxValue('Faction'),
            birthday: getInfoboxValue('Sinh nhật'),
            voice_actor: getInfoboxValue('Lồng tiếng') || getInfoboxValue('Voice Actor'),
            story: $('div.mw-parser-output p').first().text().trim() || 
                   $('.srw-description-content').text().trim() ||
                   'Không tìm thấy mô tả.',
            crawled_at: new Date().toISOString()
        };

        res.json(data);

    } catch (error) {
        console.error('Honkai Character Error:', error.message);
        
        if (error.response && error.response.status === 404) {
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
