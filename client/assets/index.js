const apiUrl = "https://opentdb.com/api.php?amount=10";

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
          button.style.backgroundColor = "#a8dadc";
          btn.style.border = 0;
          btn.style.color = "white";

        } else {
          button.style.backgroundColor = "#e63946";
        }
        // Disable all buttons after answer is chosen
        answerListEl.querySelectorAll("button").forEach(btn => {
          btn.disabled = true;
          if (btn.innerText === question.correct_answer) {
            btn.style.backgroundColor = "#a8dadc";
            btn.style.border = 0;
            btn.style.color = "white";
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
