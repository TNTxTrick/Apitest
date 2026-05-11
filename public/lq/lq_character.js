const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/lq/info';
exports.index = async (req, res, next) => {
    const tuong = req.query.tuong;
    if (!tuong) {
        return res.status(400).json({ error: 'Missing "tuong" query parameter' });
    }

    try {
        const url = `https://lienquan.garena.vn/hoc-vien/tuong-skin/d/${tuong}`;
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
            }
        });

        const $ = cheerio.load(data);

        // Tên tướng
        const fullName = $('h1, h3, .hero-name, .name').first().text().trim() || 'Unknown';
        const name = fullName.split(' ')[0];

        // Hình ảnh tướng (avatar + splash)
        const avatar = $('img.hero-avatar, .hero__avatar img').attr('src') || 
                      $('meta[property="og:image"]').attr('content');

        // Danh sách Skin
        const skins = [];
        $('ul.hero__skins--list li, .skin-list li, .skins li').each((_, el) => {
            const img = $(el).find('img').attr('src') || $(el).find('a img').attr('src');
            const skinName = $(el).find('a').attr('title') || $(el).find('.skin-name').text().trim();
            if (img) {
                skins.push({
                    name: skinName || 'Default Skin',
                    image: img.startsWith('http') ? img : 'https:' + img
                });
            }
        });

        // Kỹ năng (Skill)
        const skills = [];
        $('.hero__skills--list li, .skill-item, .skills li').each((index, el) => {
            const img = $(el).find('img').attr('src');
            const title = $(el).find('a').attr('title') || $(el).find('.skill-name').text().trim();
            const desc = $(`#heroSkill-${index + 1} article, .skill-desc, .description`).eq(index).text().trim();

            if (title) {
                skills.push({
                    id: index + 1,
                    image: img ? (img.startsWith('http') ? img : 'https:' + img) : null,
                    name: title,
                    description: desc || 'Không có mô tả'
                });
            }
        });

        // Nội tại (Passive) - thường là skill đầu tiên hoặc có class riêng
        const passive = $('.passive, .innate, .nội-tại').first().text().trim();

        res.json({
            success: true,
            name: name,
            fullName: fullName,
            avatar: avatar,
            url: url,
            skins: skins.length > 0 ? skins : "Không lấy được skin",
            skills: skills,
            passive: passive || null,
            crawledAt: new Date().toISOString()
        });

    } catch (error) {
        console.error('Crawl error:', error.message);
        res.status(500).json({
            error: 'Lỗi khi crawl dữ liệu',
            message: error.message
        });
    }
};
