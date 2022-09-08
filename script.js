'use strict';

//selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const currScore0 = document.getElementById('current--0');
const currScore1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const holdDice = document.querySelector('.btn--hold');

//player switching function

const playSwitch = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //changing of the background of the active player
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//starting conditions for game

let scores = [0, 0];
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let playing = true;
//resets the game and returns all initial values
const resetGame = function () {
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  // diceEl.classList.add('hidden');
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
};

// Game functionality

//rolling dice math function
rollDice.addEventListener('click', function () {
  if (playing) {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    //displaying the rolled dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    //checking if dice is a 1
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switching players
      playSwitch();
    }
  }
});

//when player holds the dice

holdDice.addEventListener('click', function () {
  if (playing) {
    //add the current player's score to the total score at the top

    scores[activePlayer] += currentScore;

    //display the total score and switch to the next player
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      playSwitch();
    }
  }
});
//new game button that starts a new game with the winer being the first player
newGame.addEventListener('click', function () {
  // score0El.textContent = 0;
  // score1El.textContent = 0;

  // activePlayer = 0;

  currentScore = 0;

  resetGame();

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  playing = true;
  // location.reload();
});
