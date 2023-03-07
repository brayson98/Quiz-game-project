const apiUrl = "https://opentdb.com/api.php?amount=1";

const categoriesContainer = document.getElementById("categories");
const geographyBtn = document.getElementById("geographyBtn");
const historyBtn = document.getElementById("historyBtn");
const literatureBtn = document.getElementById("literatureBtn");
const questionContainer = document.getElementById("questionContainer");
const questionEl = document.getElementById("question");
const answerListEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

geographyBtn.addEventListener("click", () => startQuiz("geography"));
historyBtn.addEventListener("click", () => startQuiz("history"));
literatureBtn.addEventListener("click", () => startQuiz("literature"));

restartBtn.addEventListener("click", restartQuiz);

let currentQuestionIndex = 0;

async function startQuiz(category) {
  categoriesContainer.style.display = "none";
  questionContainer.style.display = "block";

  scoreEl.textContent = 0;
  showQuestion(category, currentQuestionIndex);
}

async function showQuestion(category, index) {
  
  const question = await fetchQuestions(category);
  questionEl.innerText = `${index+1}. ${question[0].question}`;

  // Shuffle the answers
  const answers = [...question[0].incorrect_answers, question[0].correct_answer];
  answers.sort(() => Math.random() - 0.5);

  answerListEl.innerHTML = "";
  answers.forEach(answer => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = answer;
    if (answer === question[0].correct_answer) {
      button.setAttribute("class", "correct");
    } else {
      button.setAttribute("class", "incorrect")
    }
    button.addEventListener("click", () => {
      markAnswer(button)
      setTimeout(() => {
        if (currentQuestionIndex >= 10) {
          // End of quiz
          alert(`Quiz finished. You scored ${scoreEl.textContent}/${currentQuestionIndex}.`);
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
    scoreEl.innerText ++
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
  // Go to next question after a delay
  currentQuestionIndex++;
}

function restartQuiz() {
    location.reload();
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
