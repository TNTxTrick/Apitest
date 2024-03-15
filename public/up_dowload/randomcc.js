exports.name = '/randomcc';
exports.index = async (req, res, next) => {
  const axios = require('axios');

  let {apikey} = req.query;
  
  if (!apikey || apikey !== 'randomtnt'){
    return res.json({result: 'Lấy apikey liên hệ admin'})
  }
   
  const path = [
    "https://www.capcut.com/t/Zs86rxf1t/",
    "https://www.capcut.com/t/Zs86rawjq/", 
    "https://www.capcut.com/t/Zs86rfhpd/", 
    "https://www.capcut.com/t/Zs86rSrVw/", 
    "https://www.capcut.com/t/Zs86rfhXM/", 
    "https://www.capcut.com/t/Zs86rCvAQ/", 
    "https://www.capcut.com/t/Zs86r946X/", 
    "https://www.capcut.com/t/Zs86rCj68/", 
    "https://www.capcut.com/t/Zs86ry4t3/", 
    "https://www.capcut.com/t/Zs86rCBKN/", 
    "https://www.capcut.com/t/Zs86R1hxP/", 
  "https://www.capcut.com/t/Zs86RdKmk/", 
  "https://www.capcut.com/t/Zs86dnBjU/", 
  "https://www.capcut.com/t/Zs86RRNuh/", 
  "https://www.capcut.com/t/Zs86RFpwB/", 
  "https://www.capcut.com/t/Zs86dGgoc/", 
  "https://www.capcut.com/t/Zs86d72yC/", 
  "https://www.capcut.com/t/Zs86RYwYE/", 
  "https://www.capcut.com/t/Zs86dEpdg/", 
  "https://www.capcut.com/t/Zs86dtKco/", 
  "https://www.capcut.com/t/Zs86R8b4c/",
"https://www.capcut.com/t/Zs86LKT8f/"
  ];

  const randomLink = path[Math.floor(Math.random() * path.length)];

  try {
    const linkapi = 'https://api-7izq.onrender.com/capcut'; 

    const { title, description, usage, video } = (await axios.get(`${linkapi}?url=${randomLink}`)).data;
    const stream = (await axios.get(video, { responseType: "stream" })).data;

    res.jsonp({
      title: title,
      description: description,
      usage: usage,
      video: `${video}`
    });

  } catch (error) {
    console.error(error);
    return res.json({result: error.message});
  }
};
