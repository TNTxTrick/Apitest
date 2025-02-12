const axios = require('axios');

exports.name = '/hoyolab';
exports.index = async (req, res, next) => {

const link = req.query.link;

        // Check if link is missing or invalid
        if (!link) {
          return res.status(400).send('Missing link parameter');
        }

    const sanitizedLink = link.split('?')[0];
  
  const postIdMatch = url.match(/(\d+)$/);
  if (!postIdMatch) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  const postId = postIdMatch[1];
  
  try {
    // Make request to the Hoyolab API with the extracted post_id
    const response = await axios.get('https://bbs-api-os.hoyolab.com/community/post/wapi/getPostFull', {
      params: {
        post_id: postId,
        scene: '1'
      },
      headers: {
        'authority': 'bbs-api-os.hoyolab.com',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
        'cookie': 'mi18nLang=vi-vn; _HYVUUID=f3ba57f5-11db-4f57-ab4d-8ed8fa2bad99; DEVICEFP_SEED_ID=1af0e19fd69220d7; DEVICEFP_SEED_TIME=1739283544181; _MHYUUID=4a1da4ea-2052-42ca-bcab-256ffe2f8e2a; DEVICEFP=38d7f4b1ab73c; _gid=GA1.2.2056634375.1739283547; HYV_LOGIN_PLATFORM_OPTIONAL_AGREEMENT={%22content%22:[]}; HYV_LOGIN_PLATFORM_LOAD_TIMEOUT={}; HYV_LOGIN_PLATFORM_TRACKING_MAP={}; HYV_LOGIN_PLATFORM_LIFECYCLE_ID={%22value%22:%22491c49ea-bb67-43d5-856e-e8775085c211%22}; _gat_gtag_UA_206868027_1=1; _ga=GA1.1.460370863.1739283547; _ga_CYB6ETZXPE=GS1.1.1739283546.1.1.1739285392.0.0.0; _ga_Z2CH03T4VN=GS1.1.1739283547.1.1.1739285392.0.0.0',
        'origin': 'https://m.hoyolab.com',
        'referer': 'https://m.hoyolab.com/',
        'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36',
        'x-rpc-app_version': '3.6.0',
        'x-rpc-client_type': '5',
        'x-rpc-device_id': '4a1da4ea-2052-42ca-bcab-256ffe2f8e2a',
        'x-rpc-language': 'vi-vn',
        'x-rpc-page_info': '{"pageName":"","pageType":"","pageId":"","pageArrangement":"","gameId":""}',
        'x-rpc-show-translated': 'true',
        'x-rpc-source_info': '{"sourceName":"","sourceType":"","sourceId":"","sourceArrangement":"","sourceGameId":""}',
        'x-rpc-target_lang': 'vi-vn'
      }
    });
    
    const subject = response.data.data.post.post.subject;
    const uid = response.data.data.post.post.uid;
    const post_id = response.data.data.post.post.post_id;
    const view_num = response.data.data.post.stat.view_num;
    const reply_num = response.data.data.post.stat.reply_num;
    const like_num = response.data.data.post.stat.like_num;
    const bookmark_num = response.data.data.post.stat.bookmark_num;
    const share_num = response.data.data.post.stat.share_num;
    const contentString = response.data.data.post.post.content;
    const content = JSON.parse(contentString);
    const imageUrlList = content.imgs;
    const title = content.describe;
    res.json({ subject: subject , post_id: post_id , uid: uid , title: title , view_num: view_num , reply_num: reply_num , like_num: like_num , bookmark_num: bookmark_num , share_num: share_num , imageUrls: imageUrlList });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
};
