const axios = require('axios');

exports.name = '/deepseek';
exports.index = async (req, res, next) => {
   const text = req.query.text;
   if (!text) {
        return res.status(400).json({ error: 'Nhap cau Hoi di cu' });
   }
  const options = {
    method: 'POST',
    url: 'https://deepseek-v3.p.rapidapi.com/chat',
    headers: {
      'x-rapidapi-key': 'fd92cf57c9msh1f7b78b804353c7p1548f3jsn69db0304865d',
      'x-rapidapi-host': 'deepseek-v3.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      messages: [
        {
          role: 'user',
          content: text
        }
      ]
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
        } catch (error) {
        console.error('Error fetching data from urlscan.io:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
