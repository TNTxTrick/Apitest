app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your GET route
app.get('/api', async (req, res) => {
  // Extract query parameters from the request
  const sender = req.query.sender;
  const receiver = req.query.receiver;
  const message = req.query.message;
  const password = req.query.password;

  // Check if all required parameters are present
  if (!sender || !receiver || !message || !password) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const form = new FormData();
    form.append('sender', sender);
    form.append('receiver', receiver);
    form.append('message', message);
    form.append('background', 'https://nhanguiyeuthuong.me/wp-content/uploads/2024/10/love3.jpg');
    form.append('password', password);
    form.append('action', 'save_card');
    form.append('nonce', '14c9a4d1ca');

    // Make the request to the external API
    const response = await axios.post(
      'https://nhanguiyeuthuong.me/wp-admin/admin-ajax.php',
      form,
      {
        headers: {
          ...form.getHeaders(),
          'accept': '*/*',
          'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
          'content-type': 'multipart/form-data; boundary=----WebKitFormBoundarycM5O8kn0doYfT0Bf',
          'cookie': '_ga_2VPRRCG6WX=GS1.1.1737986084.1.0.1737986084.0.0.0; _ga=GA1.1.419157133.1737986085; __gads=ID=2891ee68a3aed1bb:T=1737986084:RT=1737986084:S=ALNI_Mb0RhYjq8H5ectS6eRix2PBo3L8Cg; __eoi=ID=0ab2f635eedcd19f:T=1737986084:RT=1737986084:S=AA-AfjbFY15L4GmCgmENhbD3lLng',
          'origin': 'https://nhanguiyeuthuong.me',
          'priority': 'u=1, i',
          'referer': 'https://nhanguiyeuthuong.me/',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
        }
      }
    );

    // Assuming the response contains a `data.data.card_url` with an ID
    const cardUrl = response.data?.data?.card_url;
    if (!cardUrl) {
      return res.status(500).json({ error: 'Card URL not found in response' });
    }

    // Extract the ID from the card URL (assuming the URL contains ?id=some_id)
    const urlParams = new URLSearchParams(cardUrl.split('?')[1]);
    const id = urlParams.get('id');

    if (!id) {
      return res.status(500).json({ error: 'ID not found in card URL' });
    }

    // Build the final URL with the extracted ID
    const link = `https://nhanguiyeuthuong.me/love?id=${id}`;

    // Return the URL in the response
    res.json({ url: link, message: 'Đã tạo thiệp thành công
