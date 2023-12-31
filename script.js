'use strict';

const mainApp = () => {
  //  Selecting the Elements

  const player0Element = document.querySelector('.player--0');
  const player1Element = document.querySelector('.player--1');
  const score0Element = document.querySelector('#score--0');
  const score1Element = document.getElementById('score--1');
  const current0Element = document.getElementById('current--0');
  const current1Element = document.querySelector('#current--1');
  const diceElement = document.querySelector('.dice');
  const btnNew = document.querySelector('.btn--new');
  const btnRoll = document.querySelector('.btn--roll');
  const btnHold = document.querySelector('.btn--hold');

  //  Starting Conditions

  let currentScore, scores, activePlayer, playing;

  const init = function () {
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    diceElement.classList.add('hidden');

    currentScore = 0;
    scores = [0, 0];
    activePlayer = 0;
    playing = true;
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
  };

  init();

  const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
  };

  //  Rolling the Dice

  btnRoll.addEventListener('click', function () {
    if (playing) {
      const dice = Math.trunc(Math.random() * 6) + 1;

      diceElement.classList.remove('hidden');
      diceElement.src = `dice-${dice}.png`;

      if (dice !== 1) {
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      } else {
        switchPlayer();
      }
    }
  });

  btnHold.addEventListener('click', function () {
    if (playing) {
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

      if (scores[activePlayer] >= 30) {
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');
        diceElement.classList.add('hidden');
        playing = false;
      } else {
        switchPlayer();
      }
    }
  });

  btnNew.addEventListener('click', init);
};

mainApp();
