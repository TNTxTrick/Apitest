const axios = require('axios');
const express = require('express');
const FormData = require('form-data');

exports.name = '/ngyt';
exports.index = async (req, res) => {
  // Lấy tham số từ request
  const sender = req.query.sender;
  const receiver = req.query.receiver;
  const message = req.query.message;
  const password = req.query.password;

  // Kiểm tra các tham số bắt buộc
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

    // Gửi request tới API bên ngoài
    const response = await axios.post(
      'https://nhanguiyeuthuong.me/wp-admin/admin-ajax.php',
      form,
      {
        headers: {
          ...form.getHeaders(),
          'accept': '*/*',
          'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
          'origin': 'https://nhanguiyeuthuong.me',
          'referer': 'https://nhanguiyeuthuong.me/',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
        }
      }
    );

    // Kiểm tra phản hồi từ API
    const cardUrl = response.data?.data?.card_url;
    if (!cardUrl) {
      return res.status(500).json({ error: 'Card URL not found in response' });
    }

    // Trích xuất ID từ URL
    const urlParams = new URLSearchParams(cardUrl.split('?')[1]);
    const id = urlParams.get('id');

    if (!id) {
      return res.status(500).json({ error: 'ID not found in card URL' });
    }

    // Xây dựng URL thiệp
    const link = `https://nhanguiyeuthuong.me/love?id=${id}`;

    // Trả về URL thiệp
    res.json({ url: link, message: 'Đã tạo thiệp thành công' });
  } catch (error) {
    console.error(error);
    return res.json({ error: 'Có lỗi xảy ra khi tải xuống dữ liệu từ API' });
  }
};
