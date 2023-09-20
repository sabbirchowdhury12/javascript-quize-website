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
let tryAgain = document.querySelector(".try-btn");
let homeBtn = document.querySelector(".home-btn");

// ---------start-button----------
function startQuiz() {
  popupInfo.classList.add("active");
  main.classList.add("active");
}

// ---------exit-button---------
function exitQuiz() {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
}

// ---------continue-button---------
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

// ---------next-button---------
nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    questionNo++;
    showQuestion(questionCount);
    questionNumber(questionNo);
    //disabled next button untill select a option
    nextBtn.classList.remove("active");
  } else {
    showResultBox();
  }
};

// ---------show question function---------
function showQuestion(index) {
  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

  let options = `<div class="option"><span>${questions[index].options[0]}</span></div>
  <div class="option"><span>${questions[index].options[1]}</span></div>
  <div class="option"><span>${questions[index].options[2]}</span></div>
  <div class="option"><span>${questions[index].options[3]}</span></div>
  `;

  optionList.innerHTML = options;

  const option = document.querySelectorAll(".option");

  //set onclick function each option
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "selectedOption(this)");
  }
}

//select option function
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

  //disabled all option after select a optiopn
  for (let i = 0; i < optionList.children.length; i++) {
    optionList.children[i].classList.add("disabled");
  }

  //enabled a next button after select a option
  nextBtn.classList.add("active");
}

// show question number fuction
function questionNumber(number) {
  totalQuestion.textContent = `${number} of ${questions.length} Questions`;
}

// show score function
function showScore(score) {
  headerScore.textContent = `Score: ${score} / ${questions.length}`;
}

// show resultbox function
function showResultBox() {
  quizBox.classList.remove("active");
  resultBox.classList.add("active");
  scoreText.textContent = `Your score ${score} out of ${questions.length}`;

  //progress bar
  let progressStartValue = -1;
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

//try again button
tryAgain.onclick = () => {
  resultBox.classList.remove("active");
  quizSection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");
  nextBtn.classList.remove("active");
  showQuestion(0);
  questionNumber(1);
  showScore(0);
  questionCount = 0;
  questionNo = 1;
  score = 0;
};

//home button
homeBtn.onclick = () => {
  resultBox.classList.remove("active");
  quizSection.classList.remove("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  nextBtn.classList.remove("active");
  showQuestion(0);
  questionNumber(1);
  showScore(0);
  questionCount = 0;
  questionNo = 1;
  score = 0;
};
