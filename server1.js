const express = require('express');
const path = require('path');
const fs = require('fs');
const { Deepgram } = require('@deepgram/sdk');
const ffmpeg = require('fluent-ffmpeg');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const db = require('./db'); // Import the pool from db.js

// const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY || 'b6befaf34e0aeb334dec44919f76c0db057bd58e';
const SECRET_KEY = process.env.SECRET_KEY || 'avikasinghhh';

const app = express();
// const deepgram = new Deepgram(DEEPGRAM_API_KEY);

const port = process.env.PORT || 5000;

// const upload = multer({ dest: 'uploads/' });
app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Both fields are required.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: 'Registration successful!' });
    } else {
      res.status(500).json({ error: 'Error registering user.' });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user.' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Both fields are required.' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const user = rows[0];
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    const jwtToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '5m' }); // Token expires in 5 minutes
    res.status(200).json({ auth: true, jwtToken });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Error logging in user.' });
  }
});

// Uncomment and configure if using the video transcription feature
/*
app.post('/transcribe', upload.single('video'), async (req, res) => {
  try {
    const filePath = req.file.path;

    let audioPath = filePath;
    if (req.file.mimetype !== 'audio/mpeg') {
      audioPath = await convertVideoToAudio(filePath);
    }

    const audioBuffer = fs.readFileSync(audioPath);

    const response = await deepgram.transcription.preRecorded(
      { buffer: audioBuffer, mimetype: 'audio/mpeg' },
      { model: 'nova', smart_format: true }
    );

    const transcript = response.results.channels[0].alternatives[0].transcript;
    const textSegments = response.results.channels[0].alternatives[0].words.map(word => ({
      text: word.word,
      start: word.start,
      end: word.end
    }));

    const drawTextFilter = textSegments.map(segment => {
      const escapedText = segment.text.replace(/'/g, "'\\''").replace(/\?/g, '\\?');
      return `drawtext=text='${escapedText}':fontfile=./fonts/glorious.ttf:fontsize=44:fontcolor=yellow:x=(w-text_w)/2:y=h-(text_h+10):enable='between(t,${segment.start},${segment.end})'`;
    }).join(',');

    const outputPath = filePath.concat('-overlay.mp4');

    ffmpeg(filePath)
      .videoFilter(drawTextFilter)
      .output(outputPath)
      .on('end', () => {
        console.log('Processing finished successfully');
        res.status(200).json({ message: 'Transcription and overlay completed', outputPath });
      })
      .on('error', (err) => {
        console.error('An error occurred: ' + err);
        res.status(500).json({ error: 'Video processing failed' });
      })
      .run();
  } catch (error) {
    console.error('General error:', error);
    res.status(500).json({ error: 'Transcription failed' });
  }
});

async function convertVideoToAudio(videoPath) {
  return new Promise((resolve, reject) => {
    const outputPath = videoPath.replace(/\.[^/]+$/, '.mp3');
    ffmpeg(videoPath)
      .output(outputPath)
      .on('end', () => {
        console.log('Video converted to audio');
        resolve(outputPath);
      })
      .on('error', (err) => {
        console.error('Conversion error:', err);
        reject(err);
      })
      .run();
  });
}
*/

app.listen(port, () => console.log(`Server listening on port ${port}`));
