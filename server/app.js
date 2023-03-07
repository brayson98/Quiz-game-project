const express = require('express');
const cors = require('cors');
const apiUrl = 'https://opentdb.com/api.php';
const geographyQuestions = require("./geographyQuestions");
const literatureQuestions = require('./literatureQuestions');
const historyQuestions = require('./historyQuestions');

const app = express();
app.use(cors());
app.use(express.json())

app.get('/questions/:category/:difficulty', (req, res) => {
  const category = req.params.category.toLowerCase();
  const difficulty = req.params.difficulty.toLowerCase();

  let questions;

  switch (category) {
    case 'geography':
      questions = geographyQuestions;
      break;
    case 'history':
      questions = historyQuestions;
      break;
    case 'literature':
      questions = literatureQuestions;
      break;
    default:
      return res.status(404).send(`No questions found for category "${category}".`);
  }

  const filteredQuestions = questions.filter(question => question.difficulty.toLowerCase() === difficulty);
  
  if (filteredQuestions.length === 0) {
    return res.status(404).send(`No questions found for category "${category}" and difficulty "${difficulty}".`);
  }

  res.send(filteredQuestions);
});


    
    

  module.exports = app;

