const express = require('express');
const cors = require('cors');
const users = require("./users");

const app = express();
app.use(cors());
app.use(express.json())

// login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    res.status(200).json({ message: "Login successful!", highScore: user.highScore });
  } else {
    res.status(401).json({ message: "Invalid username or password." });
  }
});

// signup route
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    res.status(409).json({ message: "Username already taken." });
  } else {
    users.push({ username, password, highScore: 0 });
    res.status(201).json({ message: "Signup successful!", highScore: 0 });
  }
});
// get all users
app.get("/users", (req, res) => {
  res.send(users);
})

    
    

  module.exports = app;

