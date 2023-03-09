const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Event listener for login form submission

function login() {
  const username = document.getElementById("username-input").value;
  const password = document.getElementById("password-input").value;

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Login successful!") {
          console.log(data);
          currentUser = {
            username: username,
            highScore: data.highScore
          };
          displayLoggedIn();
      } 
      document.getElementById("login-message").innerHTML = data.message;
      setTimeout(() => {
        document.getElementById("login-message").innerHTML = "";
      }, 2000);
})
.catch(error => console.error(error));
}

// Event listener for signup form submission
signupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newUsername = document.getElementById('new-username').value;
  const newPassword = document.getElementById('new-password').value;

 

  const response = fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: newUsername, password: newPassword })
  })
  .then(response => {
    if (response.ok) {
      // Signup successful
      signupForm.style.display = "none";
      return response.json();
    } else {
        // Signup failed
        throw new Error('Username already taken.');
    }
})
.then(data => {
    // Update UI with user data (e.g. high score)
    document.getElementById("signup-message").innerHTML = data.message;
    setTimeout(() => {
        document.getElementById("signup-message").innerHTML = "";
    }, 2000)
  })
  .catch(error => {
    // Display error message to user
    console.error(error);
  });
});

function submitScore(score) {
  const response = fetch('http://localhost:3000/submit-score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: currentUser.username, score })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to submit score.');
    }
    return response.json();
  })
  .then(data => {
    currentUser.highScore = data.score;
    document.getElementById("highscore").textContent = `Highscore: ${currentUser.highScore}`;
  })
  .catch(error => {
    console.error(error);
  });
}

function displayLoggedIn() {
  const loginForm = document.getElementById("login-form");
  loginForm.style.display = "none";
  signupForm.style.display = "none";

  const welcomeMessage = document.getElementById("welcome");
  welcomeMessage.textContent = `Welcome, ${currentUser.username}!`;
  welcomeMessage.style.display = "block";

  const highscore = document.getElementById("highscore");
  highscore.textContent = `Highscore: ${currentUser.highScore}`;
}