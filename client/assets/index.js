const apiUrl = "https://opentdb.com/api.php?amount=10";

const categoriesContainer = document.getElementById("categories");
const geographyBtn = document.getElementById("geographyBtn");
const historyBtn = document.getElementById("historyBtn");
const literatureBtn = document.getElementById("literatureBtn");
const questionContainer = document.getElementById("questionContainer");
const questionEl = document.getElementById("question");
const answerListEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");

geographyBtn.addEventListener("click", () => startQuiz("geography"));
historyBtn.addEventListener("click", () => startQuiz("history"));
literatureBtn.addEventListener("click", () => startQuiz("literature"));

async function startQuiz(category) {
  categoriesContainer.style.display = "none";
  questionContainer.style.display = "block";

  const questions = await fetchQuestions(category);

  let currentQuestionIndex = 0;
  let score = 0;
  showQuestion(questions[currentQuestionIndex], currentQuestionIndex);

  function showQuestion(question, index) {
    questionEl.innerText = `${index+1}. ${question.question}`;

    // Shuffle the answers
    const answers = [...question.incorrect_answers, question.correct_answer];
    answers.sort(() => Math.random() - 0.5);

    answerListEl.innerHTML = "";
    answers.forEach(answer => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.innerText = answer;
      button.addEventListener("click", () => {
        if (answer === question.correct_answer) {
          score++;
          scoreEl.innerText = `Score: ${score}`;
          button.style.backgroundColor = "green";
        } else {
          button.style.backgroundColor = "red";
        }
        // Disable all buttons after answer is chosen
        answerListEl.querySelectorAll("button").forEach(btn => {
          btn.disabled = true;
          if (btn.innerText === question.correct_answer) {
            btn.style.backgroundColor = "green";
          }
        });
        // Go to next question after a delay
        setTimeout(() => {
          currentQuestionIndex++;
          if (currentQuestionIndex >= questions.length) {
            // End of quiz
            alert(`Quiz finished. You scored ${score}/${questions.length}.`);
          } else {
            showQuestion(questions[currentQuestionIndex], currentQuestionIndex);
          }
        }, 1500);
      });
      li.appendChild(button);
      answerListEl.appendChild(li);
    });
  }
}

async function fetchQuestions(category) {
  const url = `${apiUrl}&category=${getCategoryId(category)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

function getCategoryId(category) {
  switch (category) {
    case "geography":
      return 22;
    case "history":
      return 23;
    case "literature":
      return 10;
    default:
      return "";
  }
}

//Users section

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Event listener for login form submission
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => {
    if (response.ok) {
      // Login successful
      return response.json();
    } else {
      // Login failed
      throw new Error('Invalid username or password.');
    }
  })
  .then(data => {
    // Update UI with user data (e.g. high score)
    console.log(data);
  })
  .catch(error => {
    // Display error message to user
    console.error(error);
  });
});

// Event listener for signup form submission
signupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newUsername = document.getElementById('new-username').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmNewPassword = document.getElementById('confirm-password').value;

  // Check that password and confirm password fields match
  if (newPassword !== confirmNewPassword) {
    console.error('Passwords do not match');
    return;
  }

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
      return response.json();
    } else {
      // Signup failed
      throw new Error('Username already taken.');
    }
  })
  .then(data => {
    // Update UI with user data (e.g. high score)
    console.log(data);
  })
  .catch(error => {
    // Display error message to user
    console.error(error);
  });
});