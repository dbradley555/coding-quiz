const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerEl = document.querySelector('.time-remaining');
const scoreContainerElement = document.getElementById('score-container');
const scoreNum = document.getElementById('scoreNum');
const inputFormEl = document.getElementById('high-score-form');

let shuffledQuestions, currentQuestionIndex;
let score = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
  resetScore();
});

function startGame() {
  startTimer();
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  scoreNum.innerText = 0;
  questionContainerElement.classList.remove('hide');
  scoreContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    button.addEventListener('click', resetScore);
    button.addEventListener('click', updateScore);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    // run a function that displays input for high score name
    enterName();
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}
// function to end game whenever the timer is equal to quiz over
// function that tracks how many questions were answered correctly
function updateScore(e) {
  const selectedButton = e.target;
  if (selectedButton.classList.contains('correct')) {
    score++;
  }
  scoreNum.innerText = score;
}
// reset the score to 0 if it's the first question
function resetScore() {
  if (currentQuestionIndex === 0) {
    score = 0;
    scoreNum.innerText = score;
  }
}

// function here that will display a text box to enter name for high score page
function enterName() {
  if (
    (shuffledQuestions.length = currentQuestionIndex) ||
    timerEl.innerText === 'Quiz Over'
  ) {
    inputFormEl.classList.remove('hide');
    questionContainerElement.classList.add('hide');
    answerButtonsElement.classList.add('hide');
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}
// name will be stored in local storage

function startTimer() {
  var timeLeft = 20;
  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = `${timeLeft} seconds remaining.`;
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = `${timeLeft} second remaining`;
      timeLeft--;
    } else {
      timerEl.textContent = 'Quiz Over';
      clearInterval(timeInterval);
      enterName();
    }
  }, 1000);
}

const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false },
    ],
  },
  {
    question: 'Who is the best YouTuber?',
    answers: [
      { text: 'Web Dev Simplified', correct: true },
      { text: 'Traversy Media', correct: false },
      { text: 'Dev Ed', correct: false },
      { text: 'Fun Fun Function', correct: false },
    ],
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false },
    ],
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true },
    ],
  },
];
