const popupInfo = document.querySelector(".popup-info");
const main = document.querySelector(".main");
const quizSection = document.querySelector(".quiz-section");
const nextBtn = document.querySelector(".next-btn");
const questionText = document.querySelector(".question-text");

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
  showQuestion(0);
}

let questionCount = 0;

nextBtn.onclick = () => {
  questionCount++;
  showQuestion(questionCount);
};

function showQuestion(index) {
  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;
}
