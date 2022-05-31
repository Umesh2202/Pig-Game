'use strict';

const player0El = document.querySelector('.player--0 ');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentScore1 = document.querySelector('#current--0');
const currentScore2 = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const winScore = 100;

const score = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const diceDisplay = function (number) {
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${number}.png`;
};

const playerSwitch = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Starting conditions
diceEl.classList.add('hidden');
score0El.textContent = 0;
score1El.textContent = 0;

// Dice roll
btnRoll.addEventListener('click', function () {
  // 1. Generating random number for dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  // 2. Display dice
  diceDisplay(dice);
  // 3. Check if number on dice is one
  if (dice !== 1) {
    //   Add dice to current score
    currentScore += dice;
    // Find out which player is playing
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
    // currentScore1.textContent = currentScore;
  } else {
    //  Switch player
    playerSwitch();
  }
});

// To hold the current score
btnHold.addEventListener('click', function () {
  score[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    score[activePlayer];

  if (score[activePlayer] >= winScore) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
      activePlayer + 1
    } wins!`;
    btnRoll.classList.add('hidden');
    btnHold.classList.add('hidden');
    diceEl.classList.add('hidden');
  }
  playerSwitch();
});

btnNew.addEventListener('click', function () {
  diceEl.classList.add('hidden');
  playerSwitch();
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
  document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
    activePlayer + 1
  }`;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  for (let i = 0; i < 2; i++) {
    document.querySelector(`#score--${i}`).textContent = 0;
    score[i] = 0;
  }
  // document.querySelector(`#current--${activePlayer}`).textContent = 0;
  if (activePlayer == 1) {
    playerSwitch();
  }
});
