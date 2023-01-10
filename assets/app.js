// define variables
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerEl = document.querySelector('.time-remaining');
const scoreContainerElement = document.getElementById('score-container');
const scoreNum = document.getElementById('scoreNum');
const inputFormEl = document.getElementById('high-score-form');

// initialize variables for future functions
let shuffledQuestions, currentQuestionIndex;
let score = 0;

// add event listeners to buttons
startButton.addEventListener('click', startGame);
startButton.addEventListener('click', inputFormEl.classList.add('hide'));
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
  resetScore();
});

// function that starts the game
function startGame() {
  // starts the question timer
  startTimer();
  // hide start button
  startButton.classList.add('hide');
  // create an array of questions so that it is random every time
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  // set index to 0 for first question
  currentQuestionIndex = 0;
  // set score to 0
  scoreNum.innerText = 0;
  // display score and question
  questionContainerElement.classList.remove('hide');
  scoreContainerElement.classList.remove('hide');
  setNextQuestion();
}

// function that sets next question in the random array
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// function that displays the question
function showQuestion(question) {
  // set the question text of the object to the question element
  questionElement.innerText = question.question;
  // create an answer button for each answer option
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    // if the answer is true set the data type to correct
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    // add listeners to answer buttons
    button.addEventListener('click', selectAnswer);
    button.addEventListener('click', resetScore);
    button.addEventListener('click', updateScore);
    answerButtonsElement.appendChild(button);
  });
}

// function that resets state of styles and questions at click of next button
function resetState() {
  // clears all wrong or correct styles
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  // select which answer button is targeted
  const selectedButton = e.target;
  // define the variable that will make the correct answer have the correct attribute
  const correct = selectedButton.dataset.correct;
  // run the function that checks if the selected button has the correct attribute
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  // if there are questions left to show then show next button
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    // otherwise run a function that displays input for high score name
    enterName();
  }
}

function setStatusClass(element, correct) {
  // clear previous style
  clearStatusClass(element);
  // check to see if button selected is correct or wrong and set style accordingly
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

// function to clear the correct or wrong style class
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

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
  setTimeout(() => {
    if (
      (shuffledQuestions.length = currentQuestionIndex) ||
      // function to end game whenever the timer is equal to quiz over
      timerEl.innerText === 'Quiz Over'
    ) {
      inputFormEl.classList.remove('hide');
      questionContainerElement.classList.add('hide');
      answerButtonsElement.classList.add('hide');
      nextButton.classList.add('hide');
    }
  }, 1000);
}
// entered name will be stored in local storage
// function to show high score page after view high scores is clicked
// retrieve any names submitted from local storage and display on high score page

// timer function
function startTimer() {
  var timeLeft = 60;
  var timeInterval = setInterval(function () {
    if (timeLeft > 1 && shuffledQuestions.length != currentQuestionIndex) {
      timerEl.textContent = `${timeLeft} seconds remaining.`;
      timeLeft--;
    } else if (
      timeLeft === 1 &&
      shuffledQuestions.length != currentQuestionIndex
    ) {
      timerEl.textContent = `${timeLeft} second remaining`;
      timeLeft--;
    } else {
      timerEl.textContent = 'Quiz Over';
      clearInterval(timeInterval);
      // function to end game whenever the timer is equal to quiz over
      enterName();
    }
  }, 1000);
}

// question array of objects
const questions = [
  {
    question:
      'What kind of statement is used to execute actions based on a trigger or condition?',
    answers: [
      { text: 'Fired Event', correct: false },
      { text: 'Regular Expression', correct: false },
      { text: 'Boolean Variable', correct: false },
      { text: 'Conditional Statement', correct: true },
    ],
  },
  {
    question:
      'What is a JavaScript element that represents either TRUE or FALSE values?',
    answers: [
      { text: 'Condition', correct: false },
      { text: 'Boolean', correct: true },
      { text: 'RegExp', correct: false },
      { text: 'Event', correct: false },
    ],
  },
  {
    question:
      'This is what you call the guide that defines coding conventions for all projects.',
    answers: [
      { text: 'Main textbook', correct: false },
      { text: 'Developers reference', correct: false },
      { text: 'Coding dictionary', correct: false },
      { text: 'Style guide', correct: true },
    ],
  },
  {
    question:
      'What is the element called that is used to describe the set of variables, objects, and functions you explicitly have access to?',
    answers: [
      { text: 'Scope', correct: true },
      { text: 'Restriction', correct: false },
      { text: 'Output Level', correct: false },
      { text: 'Range', correct: false },
    ],
  },
  {
    question:
      'What is the element used - and hidden - in code that explains things and makes the content more readable?',
    answers: [
      { text: 'Comparisons', correct: false },
      { text: 'Comments', correct: true },
      { text: 'Notes', correct: false },
      { text: 'Quotations', correct: false },
    ],
  },
  {
    question:
      'In JavaScript, what element is used to store multiple values in a single variable?',
    answers: [
      { text: 'Variables', correct: false },
      { text: 'Strings', correct: false },
      { text: 'Functions', correct: false },
      { text: 'Arrays', correct: true },
    ],
  },
  {
    question:
      'In JavaScript, what element is used to store and manipulate text, usually in multiples?',
    answers: [
      { text: 'Strings', correct: true },
      { text: 'Recorders', correct: false },
      { text: 'Arrays', correct: false },
      { text: 'Variables', correct: false },
    ],
  },
  {
    question:
      'What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?',
    answers: [
      { text: 'While Loop', correct: true },
      { text: 'Else Loop', correct: false },
      { text: 'Conditional Loop', correct: false },
      { text: 'For Loop', correct: false },
    ],
  },
  {
    question: 'What can loops offer JavaScript code as a whole?',
    answers: [
      { text: 'Cross-platform support', correct: false },
      { text: 'Added plug-ins', correct: false },
      { text: 'Cleaner syntax', correct: false },
      { text: 'Improved performance', correct: true },
    ],
  },
  {
    question: 'Where is the JavaScript placed inside an HTML document or page?',
    answers: [
      { text: 'In the <footer> section', correct: false },
      { text: 'In the <title> section', correct: false },
      { text: 'In the <body> and <head> sections', correct: true },
      { text: 'In the <meta> section', correct: false },
    ],
  },
];
