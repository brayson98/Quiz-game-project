const express = require('express');
const cors = require('cors');
const geographyQuestions = require("./geography");
const historyQuestions = require("./history")
const literatureQuestions = require("./literature")

const app = express();
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send(`Welcome to the quiz API!`);
})

app.get('/geography', (req, res) => {
    res.send(geographyQuestions)
})

app.get('/history', (req, res) => {
    res.send(historyQuestions)
})

app.get('/literature', (req, res) => {
    res.send(literatureQuestions)
})

module.exports = app;