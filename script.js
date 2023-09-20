const popupInfo = document.querySelector(".popup-info");
const main = document.querySelector(".main");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const nextBtn = document.querySelector(".next-btn");
const questionText = document.querySelector(".question-text");
let optionList = document.querySelector(".option-list");
let totalQuestion = document.querySelector(".total-question");
let headerScore = document.querySelector(".header-score");
let resultBox = document.querySelector(".result-box");
let scoreText = document.querySelector(".score-text");
let circularProgress = document.querySelector(".circular-progress");
let progressValue = document.querySelector(".progress-value");

function startQuiz() {
  popupInfo.classList.add("active");
  main.classList.add("active");
}
function exitQuiz() {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
}

//continue buton
function continueQuiz() {
  quizSection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");
  showQuestion(0);
  questionNumber(1);
  showScore(0);
}

let questionCount = 0;
let questionNo = 1;
let score = 0;

nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    questionNo++;
    showQuestion(questionCount);
    questionNumber(questionNo);
    nextBtn.classList.remove("active");
  } else {
    showResultBox();
  }
};

function showQuestion(index) {
  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

  let options = `<div class="option"><span>${questions[index].options[0]}</span></div>
  <div class="option"><span>${questions[index].options[1]}</span></div>
  <div class="option"><span>${questions[index].options[2]}</span></div>
  <div class="option"><span>${questions[index].options[3]}</span></div>
  `;

  optionList.innerHTML = options;

  const option = document.querySelectorAll(".option");

  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "selectedOption(this)");
  }
}

function selectedOption(option) {
  const userAnswer = option.textContent;
  const correctAnswer = questions[questionCount].answer;
  const allOptions = optionList.children.length;

  if (userAnswer === correctAnswer) {
    option.classList.add("correct");
    score++;
    showScore(score);
  } else {
    option.classList.add("wrong");

    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent === correctAnswer) {
        optionList.children[i].classList.add("correct");
      }
    }
  }

  for (let i = 0; i < optionList.children.length; i++) {
    optionList.children[i].classList.add("disabled");
  }

  nextBtn.classList.add("active");
}

function questionNumber(number) {
  totalQuestion.textContent = `${number} of 5 Questions`;
}
function showScore(score) {
  headerScore.textContent = `Score: ${score} / ${questions.length}`;
}

function showResultBox() {
  quizBox.classList.remove("active");
  resultBox.classList.add("active");
  scoreText.textContent = ` score ${score} out of ${questions.length}`;

  let progressStartValue = 0;
  let progressEndValue = (score / questions.length) * 100;
  let speed = 20;

  let progresss = setInterval(() => {
    progressStartValue++;
    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(#c40094 ${
      progressStartValue * 3.6
    }deg, rgba(255, 255, 255, 0.1) 0deg)`;

    if (progressStartValue == progressEndValue) {
      clearInterval(progresss);
    }
  }, speed);
}
