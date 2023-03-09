const apiUrl = "https://opentdb.com/api.php?command=request&amount=1&encode=url3986";

const questionContainer = document.getElementById("questionContainer");
const answerListEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");

let mode;
let category;

const selectCategory = (e) => {
  category = (e.target.getAttribute("id"))
  document.getElementById("categoryList").style.display = "none";
  document.getElementById("modeList").style.display = "unset";
}
document.getElementById("categories").addEventListener("click", selectCategory)

let timeLeft;
const timerElement = document.getElementById("timer");
let countdown;

const selectMode = (e) => {
  mode = e.target.getAttribute("id")
  document.getElementById("modeList").style.display = "none";
  if (mode === "timed") {
    timerElement.style.display = "unset";
    timeLeft = 30;
    countdown = setInterval(decreaseTimer, 1000)
  }
  startQuiz(category)
}

document.getElementById("modes").addEventListener("click", selectMode)

const decreaseTimer = () => {
  if (timeLeft > 0) {
    timeLeft--;
    timerElement.textContent = timeLeft;
  } else {
    clearInterval(countdown);
    submitScore(score);
    alert("Time's up!");
  }
}

let score = 0;
let currentQuestionIndex = 0; 

async function startQuiz(category) {
  questionContainer.style.display = "block";
  scoreEl.textContent = 0;
  showQuestion(category, currentQuestionIndex);
}

async function showQuestion(category, index) {
  
  const question = await fetchQuestions(category);
  document.getElementById("question").innerText = decodeURIComponent(`${index+1}. ${question[0].question}`);

  // Shuffle the answers
  const answers = [...question[0].incorrect_answers, question[0].correct_answer];
  answers.sort(() => Math.random() - 0.5);

  answerListEl.innerHTML = "";
  answers.forEach(answer => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = decodeURIComponent(answer);
    if (answer === question[0].correct_answer) {
      button.setAttribute("class", "correct");
    } else {
      button.setAttribute("class", "incorrect")
    }
    button.addEventListener("click", () => {
      markAnswer(button)
      setTimeout(() => {
        if ((mode === "standard" && currentQuestionIndex >= 10) || timeLeft == 0) {
          // End of quiz
          alert(`Quiz finished. You scored ${score}/${currentQuestionIndex}.`);
          submitScore(score);
        } else {
          showQuestion(category, currentQuestionIndex);
        }
      }, 1500);

    });
    li.appendChild(button);
    answerListEl.appendChild(li);
  });    
}

const markAnswer = (button) => {
  if (button.getAttribute("class") === "correct") {
    score ++;
    scoreEl.innerText = `${score}`;
    button.style.backgroundColor = "#06d6a0";
    button.style.border = 0;
    button.style.color = "white";
  } else {
    button.style.backgroundColor = "#e63946";
  }
  // Disable all buttons after answer is chosen
  answerListEl.querySelectorAll("button").forEach(btn => {
    btn.disabled = true;
    if (btn.getAttribute("class") === "correct") {
      btn.style.backgroundColor = "#06d6a0";
      btn.style.border = 0;
      btn.style.color = "white";
    }
  });
  currentQuestionIndex++;
}

async function fetchQuestions(category) {
  const url = `${apiUrl}&category=${getCategoryId(category)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

const getCategoryId = (category) => {
  switch (category) {
    case "geography":
     previousCategory = "geography";
      return 22;
    case "history":
      previousCategory = "history";
      return 23;
    case "literature":
      previousCategory = "literature";
      return 10;
    case "politics":
      previousCategory = "politics";
      return 24;
    case "art":
      previousCategory = "art";
      return 25;
    default:
      return "";
  }
}

const restartButton = document.getElementById("restartBtn");

restartButton.addEventListener("click", function() {
    score = 0;
    currentQuestionIndex = 0;
    clearInterval(countdown)
    scoreEl.innerText = `${score}`;
    timerElement.style.display = "none"
    document.getElementById("categoryList").style.display = "block";
    questionContainer.style.display = "none"
    location.href = "#";
    location.href = "#categoryList";
});