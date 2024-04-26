exports.name = '/random';
exports.index = async (req, res, next) => {
  const axios = require('axios');
  const fs = require('fs'); 

  let {apikey} = req.query;
  
  if (!apikey || apikey !== 'randomtnt'){
    return res.json({result: 'Lấy apikey liên hệ admin'})
  }
   
  const path = [
    "https://vt.tiktok.com/ZSF5w7AwF/",
    "https://vt.tiktok.com/ZSFAwd12G/",
    "https://vt.tiktok.com/ZSFATEP5u/",
    "https://vt.tiktok.com/ZSFAw8HGx/", 
    "https://vt.tiktok.com/ZSFATWcUT/", 
    "https://vt.tiktok.com/ZSFAweTN7/", 
    "https://vt.tiktok.com/ZSFAw1qhJ/", 
    "https://vt.tiktok.com/ZSFAwBRND/", 
    "https://vt.tiktok.com/ZSFAwmQMp/",
    "https://vt.tiktok.com/ZSFAKRBpk/", 
    "https://vt.tiktok.com/ZSFAKFGH1/", 
    "https://vt.tiktok.com/ZSFAKfhhx/",
    "https://vt.tiktok.com/ZSFAKU8D1/",
    "https://vt.tiktok.com/ZSFAKeTya/", 
    "https://vt.tiktok.com/ZSFAKMXtX/", 
    "https://vt.tiktok.com/ZSFAKBEun/", 
    "https://vt.tiktok.com/ZSFAKjveP/", 
    "https://vt.tiktok.com/ZSFAKY1kw/", 
    "https://vt.tiktok.com/ZSFAK25LB/", 
    "https://vt.tiktok.com/ZSFAKBY3v/", 
    "https://vt.tiktok.com/ZSFDnNvqX/", 
    "https://vt.tiktok.com/ZSFDtoLLa/", 
    "https://vt.tiktok.com/ZSFDndVbD/", 
    "https://vt.tiktok.com/ZSFDnN7Ys/", 
    "https://vt.tiktok.com/ZSFDn5moV/", 
    "https://vt.tiktok.com/ZSFDnrpgM/", 
    "https://vt.tiktok.com/ZSFDnmsxq/", 
    "https://vt.tiktok.com/ZSFDn9Ywa/", 
    "https://vt.tiktok.com/ZSFDnhbG3/",
    "https://vt.tiktok.com/ZSFDnuypD/", 
    "https://vt.tiktok.com/ZSFDnfnKU/",
    "https://vt.tiktok.com/ZSFDnSxvP/", 
    "https://vt.tiktok.com/ZSFDna5jq/", 
    "https://vt.tiktok.com/ZSFDnVHdm/",
    "https://vt.tiktok.com/ZSF5yFBGA/", 
    "https://vt.tiktok.com/ZSF5yXHmj/", 
    "https://vt.tiktok.com/ZSF5y5K6D/",
    "https://vt.tiktok.com/ZSF5yAAk4/", 
    "https://vt.tiktok.com/ZSF5yHfF3/", 
    "https://vt.tiktok.com/ZSF5ygMhr/", 
    "https://vt.tiktok.com/ZSF5ymLRr/", 
    "https://vt.tiktok.com/ZSF5yXtn1/", 
    "https://vt.tiktok.com/ZSF5w7AwF/", 
    "https://vt.tiktok.com/ZSFuw1pN7/", 
    "https://vt.tiktok.com/ZSFuTtPeM/", 
    "https://vt.tiktok.com/ZSFuTGPRM/", 
    "https://vt.tiktok.com/ZSFuTcS98/", 
    "https://vt.tiktok.com/ZSFuTKsh4/", 
    "https://vt.tiktok.com/ZSFuwx3X8/", 
    "https://vt.tiktok.com/ZSFuwkVHD/", 
    "https://vt.tiktok.com/ZSFuwrL2U/", 
    "https://vt.tiktok.com/ZSFuwQ8CN/", 
    "https://vt.tiktok.com/ZSFuwamxC/", 
    "https://vt.tiktok.com/ZSFuwav1S/", 
    "https://vt.tiktok.com/ZSFuwuPNG/", 
    "https://vt.tiktok.com/ZSFuwAgWF/", 
    "https://vt.tiktok.com/ZSFuwujGq/", 
    "https://vt.tiktok.com/ZSFuwScnP/", 
    "https://vt.tiktok.com/ZSFuwQBs2/", 
    "https://vt.tiktok.com/ZSFuwmg79/", 
    "https://vt.tiktok.com/ZSFuwUuPq/", 
    "https://vt.tiktok.com/ZSFgdrdyG/", 
    "https://vt.tiktok.com/ZSFgdpEbU/", 
    "https://vt.tiktok.com/ZSFgd79jh/", 
    "https://vt.tiktok.com/ZSFgdWQ9d/", 
    "https://vt.tiktok.com/ZSFgdKD2G/", 
    "https://vt.tiktok.com/ZSFcscQed/", 
    "https://vt.tiktok.com/ZSFcGJg5d/", 
    "https://vt.tiktok.com/ZSFcsq6Qe/", 
    "https://vt.tiktok.com/ZSFcstnUU/", 
    "https://vt.tiktok.com/ZSFcsvKVc/", 
    "https://vt.tiktok.com/ZSFcGjf6r/", 
    "https://vt.tiktok.com/ZSFcGBMj5/", 
    "https://vt.tiktok.com/ZSFcGawtR/", 
    "https://vt.tiktok.com/ZSFcGRDAj/", 
    "https://vt.tiktok.com/ZSFcGSwRj/", 
    "https://vt.tiktok.com/ZSFcGyoeG/", 
    "https://vt.tiktok.com/ZSFcGFKoS/"

  ];

  const randomCodm = path[Math.floor(Math.random() * path.length)];

  try {
    const response = await axios.post('https://www.tikwm.com/api/', { url: randomCodm }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    const videoUrl = response.data.data.play;
    const userName = response.data.data.author.unique_id;
    const usernickname = response.data.data.author.nickname;
    const title = response.data.data.title;
    const id = response.data.data.id;
    const likes = response.data.data.digg_count;
    const comments = response.data.data.comment_count;
    const share = response.data.data.share_count;
    const views = response.data.data.play_count;
    const video = response.data.data.video_url;

    res.send(response.data);

    console.log({VideoUrl: videoUrl, Username: userName, Usernickname: usernickname, Title: title, ID: id, Likes: likes, Comments: comments, Share: share, Views: views});
	
  } catch (error) {
    console.error(error);
    return res.json({result: error.message});
  }
};
