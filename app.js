const express = require('express');
const qrcode = require('qrcode');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/generate-qr', async (req, res) => {
  try {
    const { url } = req.body;

    // Generate QR code
    const qrCode = await qrcode.toDataURL(url);

    // Send the QR code image as a response
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <link rel="stylesheet" type="text/css" href="/styles.css">
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>QR Code</title>
      </head>
      <body>
          <h2>Generated QR Code:</h2>
          <img src="${qrCode}" alt="QR Code" /><br>
          <a href="/">Go Back</a>
      </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
