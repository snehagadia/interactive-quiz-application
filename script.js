
const questions = [
  {
    question: "What does a large language model actually predict?",
    options: [
      "The next token",
      "The entire paragraph",
      "The final answer",
      "The user's intention"
    ],
    answer: "The next token"
  },
  {
    question: "In the commit-message format used in this course, what comes before the colon?",
    options: [
      "The type, such as feat or fix",
      "The filename",
      "The programmer name",
      "The date"
    ],
    answer: "The type, such as feat or fix"
  },
  {
    question: "What must a unit test do before the bug is fixed?",
    options: ["Fail", "Pass", "Stop running", "Delete the code"],
    answer: "Fail"
  },
  {
    question: "Where should the styling for a webpage live?",
    options: [
      "In a separate CSS file",
      "Inside Python",
      "Inside the browser console",
      "Inside a text file"
    ],
    answer: "In a separate CSS file"
  },
  {
    question: "What does a loop inside another loop usually mean for time complexity?",
    options: [
      "It is quadratic",
      "It is constant",
      "It is logarithmic",
      "It has no complexity"
    ],
    answer: "It is quadratic"
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const progressElement = document.getElementById("progress");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next");
const resultElement = document.getElementById("result");
const restartButton = document.getElementById("restart");

function showQuestion() {
  answered = false;
  nextButton.disabled = true;
  feedbackElement.textContent = "";
  optionsElement.replaceChildren();
  resultElement.hidden = true;

  const item = questions[currentQuestion];
  progressElement.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;
  questionElement.textContent = item.question;

  item.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.className = "option";
    button.addEventListener("click", () => checkAnswer(option, button));
    optionsElement.appendChild(button);
  });

  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "Show Results"
      : "Next Question";
}

function checkAnswer(selectedOption, selectedButton) {
  if (answered) return;
  answered = true;

  const correctAnswer = questions[currentQuestion].answer;

  optionsElement.querySelectorAll("button").forEach(button => {
    button.disabled = true;
    if (button.textContent === correctAnswer) {
      button.classList.add("correct");
    }
  });

  if (selectedOption === correctAnswer) {
    score++;
    feedbackElement.textContent = "Correct answer!";
  } else {
    selectedButton.classList.add("wrong");
    feedbackElement.textContent = `Incorrect. Correct answer: ${correctAnswer}`;
  }

  nextButton.disabled = false;
}

function showResults() {
  questionElement.textContent = "Quiz Complete!";
  progressElement.textContent = "You have answered all questions.";
  optionsElement.replaceChildren();
  feedbackElement.textContent = "";
  nextButton.hidden = true;
  resultElement.hidden = false;
  resultElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  restartButton.hidden = false;
}

nextButton.addEventListener("click", () => {
  if (!answered) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showResults();
  }
});

restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  nextButton.hidden = false;
  restartButton.hidden = true;
  showQuestion();
});

showQuestion();
