const apiUrl = "https://opentdb.com/api.php?command=request&amount=1&encode=url3986";

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
const standardModeBtn = document.getElementById("standardModeBtn");
const timedModeBtn = document.getElementById("timedModeBtn");

let mode;
let category;
let deadline;

geographyBtn.addEventListener("click", () => {
  document.getElementById("categoryList").style.display = "none";
  document.getElementById("modeList").style.display = "unset";
  category = "geography"
});

historyBtn.addEventListener("click", () => {
  document.getElementById("categoryList").style.display = "none";
  document.getElementById("modeList").style.display = "unset";
  category = "history"
});

literatureBtn.addEventListener("click", () => {
  document.getElementById("categoryList").style.display = "none";
  document.getElementById("modeList").style.display = "unset";
  category = "literature"
});

politicsBtn.addEventListener("click", () => {
  document.getElementById("categoryList").style.display = "none";
  document.getElementById("modeList").style.display = "unset";
  category = "geography"
});

artBtn.addEventListener("click", () => {
  document.getElementById("categoryList").style.display = "none";
  document.getElementById("modeList").style.display = "unset";
  category = "geography"
});

standardModeBtn.addEventListener("click", () => {
  document.getElementById("modeList").style.display = "none";
  mode = "standard"
  startQuiz(category)
})

timedModeBtn.addEventListener("click", () => {
  document.getElementById("modeList").style.display = "none";
  mode = "timed"
  deadline = new Date().getTime() + 30000
  document.getElementById("timer").style.display = "unset";
  timeLeft = 60;
  startQuiz(category)
})


let score = 0;
let currentQuestionIndex = 0; 

async function startQuiz(category) {

  questionContainer.style.display = "block";
  scoreEl.textContent = 0;
  showQuestion(category, currentQuestionIndex);
  var element = document.querySelector("#selectNewCategory");
  element.scrollIntoView();
  
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
        if (endCondition()) {
          // End of quiz
          submitScore(score);
          alert(`Quiz finished. You scored ${score}/${currentQuestionIndex}.`);
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
  // Go to next question after a delay
  currentQuestionIndex++;
}

const endCondition = () => {
  
  if (mode === "standard" && currentQuestionIndex > 3) {
    return true;
  } else if (mode === "timed" && timeLeft == 0) {
    return true
  } else {
    return false
  }
}


const timerElement = document.getElementById("timer");
 // 60 seconds

const countdown = setInterval(() => {
  let timeLeft = 60;
  if (timeLeft > 0) {
    timeLeft--;
    timerElement.textContent = timeLeft;
  } else {
    clearInterval(countdown);
    alert("Time's up!");
  }
}, 1000);



async function fetchQuestions(category) {
  const url = `${apiUrl}&category=${getCategoryId(category)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

function getCategoryId(category) {
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
    scoreEl.innerText = `${score}`;

    startQuiz(previousCategory);
});
const selectNewCategory = document.getElementById("selectNewCategory")
selectNewCategory.addEventListener("click", function() {

  document.getElementById("categoryList").style.display = "block";
  location.href = "#";
  location.href = "#categoryList";
})