// Word list
const words = [  "javascript",  "html",  "css",  "bootstrap",  "jquery",  "react",  "angular",  "node",  "express"];

// Game variables
let word = words[Math.floor(Math.random() * words.length)];
let answerArray = [];
for (let i = 0; i < word.length; i++) {
  answerArray[i] = "_";
}
let remainingLetters = word.length;
let wins = 0;
let losses = 0;
let timeLeft = 20;
let timerId;

// Game functions
function updateDisplay() {
  let answerString = answerArray.join(" ");
  document.getElementById("word").textContent = answerString;
  document.getElementById("wins").textContent = wins;
  document.getElementById("losses").textContent = losses;
  document.getElementById("time").textContent = timeLeft;
}

function checkGuess(guess) {
  let correctGuess = false;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === guess) {
      answerArray[i] = guess;
      correctGuess = true;
      remainingLetters--;
    }
  }
  return correctGuess;
}

function processGuess(guess) {
  if (remainingLetters > 0 && timeLeft > 0) {
    let correctGuess = checkGuess(guess);
    if (correctGuess) {
      if (remainingLetters === 0) {
        wins++;
        stopTimer();
        alert("You win!");
      }
    } else {
      timeLeft--;
      if (timeLeft === 0) {
        losses++;
        stopTimer();
        alert("You lose!");
      }
    }
  }
  updateDisplay();
}

function startTimer() {
  timerId = setInterval(function() {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      losses++;
      alert("You lose!");
    }
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
}

// Start the game
updateDisplay();
startTimer();

// Event listeners
document.addEventListener("keypress", function(event) {
  let guess = String.fromCharCode(event.keyCode);
  processGuess(guess);
});

document.getElementById("start").addEventListener("click", function(event) {
  event.preventDefault();
  word = words[Math.floor(Math.random() * words.length)];
  answerArray = [];
  for (let i = 0; i < word.length; i++) {
    answerArray[i] = "_";
  }
  remainingLetters = word.length;
  timeLeft = 20;
  updateDisplay();
  startTimer();
}); 
