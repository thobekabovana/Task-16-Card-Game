const emojis = ["❤️", "🍀", "🌟", "🍎", "🍉", "🌈", "🔥", "💎", "🌸"];
const cards = emojis.flatMap((emoji) => [emoji, emoji]);
let shuffledCards = shuffle(cards);
let selectedCards = [];
let matchedCards = 0;
let timerInterval;

const gameBoard = document.getElementById("game-board");
const winningMessage = document.getElementById("winning-message");
const timeUpMessage = document.getElementById("time-up-message");
const winSound = document.getElementById("win-sound");
const timerDisplay = document.getElementById("timer");

let timeRemaining = 180; // 3 minutes in seconds

// Start the countdown timer
function startTimer() {
  timerDisplay.textContent = formatTime(timeRemaining);
  timerInterval = setInterval(() => {
    timeRemaining--;
    timerDisplay.textContent = formatTime(timeRemaining);

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      endGame(false);
    }
  }, 1000);
}

// Format time as mm:ss
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// End the game
function endGame(won) {
  clearInterval(timerInterval);
  if (won) {
    winningMessage.classList.remove("hidden");
    winSound.play();
  } else {
    timeUpMessage.classList.remove("hidden");
  }
}

// Create the game grid
function setupGame() {
  gameBoard.innerHTML = "";
  shuffledCards.forEach((value, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
    card.dataset.index = index;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
  startTimer(); // Start the timer when the game setup is complete
}

// Shuffle the cards array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Flip a card
function flipCard() {
  const card = this;
  if (selectedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    card.textContent = card.dataset.value;
    selectedCards.push(card);

    if (selectedCards.length === 2) {
      checkMatch();
    }
  }
}

// Check if selected cards match
function checkMatch() {
  const [first, second] = selectedCards;
  if (first.dataset.value === second.dataset.value) {
    matchedCards += 2;
    selectedCards = [];
    if (matchedCards === shuffledCards.length) {
      endGame(true);
    }
  } else {
    setTimeout(() => {
      first.classList.remove("flipped");
      first.textContent = "";
      second.classList.remove("flipped");
      second.textContent = "";
      selectedCards = [];
    }, 1000);
  }
}

// Reset the game
function resetGame() {
  clearInterval(timerInterval);
  timeRemaining = 180;
  shuffledCards = shuffle(cards);
  selectedCards = [];
  matchedCards = 0;
  winningMessage.classList.add("hidden");
  timeUpMessage.classList.add("hidden");
  setupGame();
}

setupGame();
