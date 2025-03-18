const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

const upload = multer({
  dest: 'uploads/', // Destination folder to save the uploaded files
});

// GET endpoint
app.get('/transcript', (req, res) => {
  res.send('Welcome to the Video Transcription Service!');
});

app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, './uploads/', req.file.originalname);

  fs.rename(tempPath, targetPath, (err) => {
    if (err) return res.status(500).send('Error uploading file');
    res.status(200).send('File uploaded successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

