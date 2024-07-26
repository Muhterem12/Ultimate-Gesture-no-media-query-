"use strict";

const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");
const fightText = document.getElementById("fight-text");
const restartBtn = document.querySelector(".restart-btn");
const playersImage = document.getElementById("player-choice-img");
const computersImage = document.getElementById("computer-choice-img");
const vs = document.querySelector(".images-container");
const winGif = document.querySelector(".win_png");
const loseGif = document.querySelector(".lose_png");
const footer = document.querySelector("footer");

let playerScore = 0;
let computerScore = 0;

vs.classList.add("hidden");

//////////////////////////////
// Functions
function getRandomComputerResult() {
  const options = ["Rock", "Paper", "Scissors", "Golem", "Griffin"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function hasPlayerWonTheRound(player, computer) {
  return (
    (player === "Rock" && (computer === "Scissors" || computer === "Golem")) ||
    (player === "Paper" && (computer === "Rock" || computer === "Golem")) ||
    (player === "Scissors" &&
      (computer === "Paper" || computer === "Griffin")) ||
    (player === "Golem" &&
      (computer === "Scissors" || computer === "Griffin")) ||
    (player === "Griffin" && (computer === "Paper" || computer === "Rock"))
  );
}

function getRoundResults(userOption) {
  const computerResult = getRandomComputerResult();

  playersImage.src = `user_${userOption.toLowerCase()}.png`;
  computersImage.src = `computer_${computerResult.toLowerCase()}.png`;

  if (hasPlayerWonTheRound(userOption, computerResult)) {
    playerScore++;
    return `Player wins! ${userOption} beats ${computerResult}`;
  } else if (computerResult === userOption) {
    return `It's a tie! Both chose ${userOption}`;
  } else {
    computerScore++;
    return `Computer wins! ${computerResult} beats ${userOption}`;
  }
}

function showResults(userOption) {
  vs.classList.remove("hidden");
  roundResultsMsg.innerText = getRoundResults(userOption);
  computerScoreSpanElement.innerText = computerScore;
  playerScoreSpanElement.innerText = playerScore;

  if (playerScore === 3 || computerScore === 3) {
    if (playerScore === 3) {
      winnerMsgElement.innerText = "Winner winner chicken dinner";
      winGif.classList.remove("hidden");
    } else {
      winnerMsgElement.innerText = "Game over. Try again!";
      loseGif.classList.remove("hidden");
    }

    resetGameBtn.style.display = "block";
    optionsContainer.style.display = "none";
    footer.classList.add("hidden");
  }
}

function resetGame() {
  loseGif.classList.add("hidden");
  winGif.classList.add("hidden");
  vs.classList.add("hidden");
  playerScore = 0;
  computerScore = 0;

  playerScoreSpanElement.innerText = playerScore;
  computerScoreSpanElement.innerText = computerScore;
  resetGameBtn.style.display = "none";
  optionsContainer.style.display = "block";
  winnerMsgElement.innerText = "";
  roundResultsMsg.innerText = "";
  playersImage.src = "";
  computersImage.src = "";
  footer.classList.remove("hidden");
}

//////////////////////////////
// Event Handlers

restartBtn.addEventListener("click", resetGame);

resetGameBtn.addEventListener("click", resetGame);

document.getElementById("rock-btn").addEventListener("click", function () {
  showResults("Rock");
});

document.getElementById("paper-btn").addEventListener("click", function () {
  showResults("Paper");
});

document.getElementById("scissors-btn").addEventListener("click", function () {
  showResults("Scissors");
});

document.getElementById("golem-btn").addEventListener("click", function () {
  showResults("Golem");
});

document.getElementById("griffin-btn").addEventListener("click", function () {
  showResults("Griffin");
});
