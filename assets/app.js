var quizAnswers = $('.quiz-answers');
var quizQuestion = $('.quiz-question');
var correctAnswer = $('.correct-result');
var incorrectAnswer = $('.incorrect-result');
var scoreResult = $('.score-result');
var allDone = $('.finished');
var timerEl = $('.timer-seconds');
var startBtn = $('.startBtn');
var nameInput = $('.name-input');

// Object for all questions
var questions = {
  qOne: 'One',
  qTwo: 'two',
  qThree: 'three',
  qFour: 'four',
  qFive: 'five',
  qSix: 'six',
  qSeven: 'seven',
  qEight: 'eight',
  qNine: 'nine',
  qTen: 'ten',
};

// Object for all answers
var answers = {
  ansOne: ['one', 'two', 'three', 'four'],
  ansTwo: ['one', 'two', 'three', 'four'],
  ansThree: ['one', 'two', 'three', 'four'],
  ansFour: ['one', 'two', 'three', 'four'],
  ansFive: ['one', 'two', 'three', 'four'],
  ansSix: ['one', 'two', 'three', 'four'],
  ansSeven: ['one', 'two', 'three', 'four'],
  ansEight: ['one', 'two', 'three', 'four'],
  ansNine: ['one', 'two', 'three', 'four'],
  ansTen: ['one', 'two', 'three', 'four'],
};

// function to pull in question
function getQuestion(e) {
  var keys = Object.keys(questions);
  var questionText = questions[keys[Math.floor(Math.random() * keys.length)]];
  // display question to screen if there is no current question, otherwise clear previous first then display
  if (!quizQuestion.children()) {
    var questionDis = $('<p>');
    questionDis.text(questionText);
    quizQuestion.append(questionDis);
  } else {
    quizQuestion.children().remove();
    var questionDis = $('<p>');
    questionDis.text(questionText);
    quizQuestion.append(questionDis);
  }
  e.preventDefault();
}

// function to pull in answer options
function getAnswers(e) {
  var keys = Object.keys(answers);
  var answerText = answers[keys[Math.floor(Math.random() * keys.length)]];
  // Attach list answers to the ordered list
  //   if ordered list is currently empty, attach, otherwise, empty list first, then attach
  if (!quizAnswers.children()) {
    var listAnswer = $('<li>');
    listAnswer.text(answerText);
    quizAnswers.append(listAnswer);
  } else {
    quizAnswers.children('li').remove();
    var listAnswer = $('<li>');
    listAnswer.text(answerText);
    quizAnswers.append(listAnswer);
  }
  e.preventDefault();
}

// Generate the score result and display to screen
function generateScore(e) {
  e.preventDefault();
  var scorePara = $('<p>');
  var scoreNumber = $('<span>');
  //   function to generate score Number based off questions answered correctly
  scorePara.append(scoreNumber);
  scorePara.text('Your score is:');
  scoreResult.append(scorePara);
}

// generate the time remaining for the quiz
function startTimer() {
  var timeLeft = 20;
  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.text(`${timeLeft} seconds remaining.`);
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.text(`${timeLeft} second remaining`);
      timeLeft--;
    } else {
      timerEl.text('Quiz Over');
      clearInterval(timeInterval);
    }
  }, 1000);
}

// display score and form to submit to leaderboard on either quiz end or timer end
function displaySubmit(e) {
  e.preventDefault();
  var nameForm = $('<form>');
  nameForm.addClass('high-score-name');
  var nameLabel = $('<label>');
  nameLabel.attr('for', 'name');
  nameLabel.text('Enter your name here to go on the leaderboard!');
  var inputForm = $('<input>');
  inputForm.attr('type', 'text');
  inputForm.attr('id', 'name');
  inputForm.attr('name', 'name');
  var formBreak = $('<br>');
  nameLabel.append(formBreak);
  nameLabel.append(inputForm);
  nameForm.append(nameLabel);
  nameInput.append(nameForm);
  inputForm.append(formBreak);
  var submitInput = $('<input>');
  submitInput.prop('type', 'submit');
  submitInput.prop('value', 'Submit');
  inputForm.append(submitInput);
}

startBtn.click(getQuestion);
startBtn.click(getAnswers);
startBtn.click(startTimer);
startBtn.click(displaySubmit);
