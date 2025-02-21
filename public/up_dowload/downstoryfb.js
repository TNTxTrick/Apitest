const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/storyfb';
exports.index = async (req, res, next) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'Thiếu tham số url' });
    }

    // Kiểm tra URL có phải là link Facebook không
    const isValidFBUrl = (link) => {
      try {
        const parsed = new URL(link);
        return parsed.hostname.includes('facebook.com') || parsed.hostname.includes('fb.watch');
      } catch {
        return false;
      }
    };

    if (!isValidFBUrl(url)) {
      return res.status(400).json({ error: 'URL không hợp lệ, vui lòng nhập link Facebook hợp lệ' });
    }

    // Gửi request đến getvidfb.com
    const response = await axios.post(
      'https://getvidfb.com/',
      new URLSearchParams({
        'url': url,
        'lang': 'en',
        'type': 'redirect'
      }),
      {
        headers: {
          'authority': 'getvidfb.com',
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'cache-control': 'max-age=0',
          'origin': 'https://getvidfb.com',
          'referer': 'https://getvidfb.com/',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-user': '?1',
          'upgrade-insecure-requests': '1',
          'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36'
        }
      }
    );

    if (response.status !== 200) {
      return res.status(500).json({ error: 'Không thể lấy dữ liệu từ máy chủ' });
    }

    // Load HTML vào Cheerio
    const $ = cheerio.load(response.data);
    let filteredLinks = [];

    // Lấy nội dung của thẻ h3 (nếu có)
    let title = $('h3').text().trim() || "Không tìm thấy tiêu đề";

    // Tìm tất cả các thẻ <a> và lọc link có định dạng mong muốn
    $('a').each((index, element) => {
      let href = $(element).attr('href');
      if (href && (href.startsWith('https://scontent') || href.startsWith('https://video'))) {
        // Xóa tất cả các `&dl=1` ở cuối URL
        href = href.replace(/(&dl=1)+$/, '');
        filteredLinks.push(href);
      }
    });

    res.json({
      title: title,
      filtered_links: filteredLinks
    });

  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: "Lỗi khi xử lý yêu cầu", details: error.message });
  }
};
