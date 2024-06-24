const q = req.query.q;
  const apiKey = 'AIzaSyB-r3YSknuYbyyjmXK8dKJDu2xojBzi5wo';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  const data = {
    contents: [
      {
        parts: [
          {
            text: q
          }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating content' });
  }
});
