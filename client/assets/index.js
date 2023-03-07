const apiUrl = "https://opentdb.com/api.php?amount=1&encode=url3986";

const categoriesContainer = document.getElementById("categories");
const geographyBtn = document.getElementById("geographyBtn");
const historyBtn = document.getElementById("historyBtn");
const literatureBtn = document.getElementById("literatureBtn");
const politicsBtn = document.getElementById("politicsBtn");
const artBtn = document.getElementById("artBtn");
const questionContainer = document.getElementById("questionContainer");
const questionEl = document.getElementById("question");
const answerListEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");

geographyBtn.addEventListener("click", () => startQuiz("geography"));
historyBtn.addEventListener("click", () => startQuiz("history"));
literatureBtn.addEventListener("click", () => startQuiz("literature"));
politicsBtn.addEventListener("click", () => startQuiz("politics"));
artBtn.addEventListener("click", () => startQuiz("art"));

let currentQuestionIndex = 0;
let score = 0;

async function startQuiz(category) {
  document.getElementById("selectCategory").style.display = "none"; 
  categoriesContainer.style.display = "none";
  questionContainer.style.display = "block";
  scoreEl.textContent = 0;
  showQuestion(category, currentQuestionIndex);
  
}


async function showQuestion(category, index) {
  
  const question = await fetchQuestions(category);
  questionEl.innerText = decodeURIComponent(`${index+1}. ${question[0].question}`);

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
        if (currentQuestionIndex >= 3) {
          // End of quiz
          submitScore(score);
          alert(`Quiz finished. You scored ${score}/${currentQuestionIndex}.`);
        } else {
          showQuestion(category, currentQuestionIndex);
          console.log(score);
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
  // Go to next question after a delay
  currentQuestionIndex++;
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
    case "politics":
      return 24;
    case "art":
      return 25;
    default:
      return "";
  }
}

const restartButton = document.getElementById("restartBtn");

restartButton.addEventListener("click", function() {
    score = 0;
    currentQuestionIndex = 0;
    scoreEl.innerText = `Score: ${score}`;
    startQuiz();
});