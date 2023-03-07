const express = require('express');
const cors = require('cors');
const apiUrl = 'https://opentdb.com/api.php';

const app = express();
app.use(cors());
app.use(express.json())


app.get('/api/questions', async (req, res) => {
    const { category, difficulty } = req.query;
  
    try {
      const response = await fetch(`${apiUrl}?amount=10&category=${category}&difficulty=${difficulty}`);
      const data = await response.json();
      res.json(data.results);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

  module.exports = app;

