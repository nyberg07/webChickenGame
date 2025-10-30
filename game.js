// ------------------ Spel-logik ------------------
let totals = [0, 0];       // totalpoäng för spelare 1 och 2
let currents = [0, 0];     // turpoäng för spelare 1 och 2
let active = 0;            // 0 = spelare 1, 1 = spelare 2
let playing = true;
const WIN_LIMIT = 100;     // poäng som krävs för vinst
const BUST_LIMIT = 100;    // maxpoäng innan man "går över"

// Element
const totalEls = [document.getElementById('total1'), document.getElementById('total2')];
const currentEls = [document.getElementById('current1'), document.getElementById('current2')];

const rollBtn = document.getElementById('rollBtn');
const holdBtn = document.getElementById('holdBtn');
const newBtn = document.getElementById('newBtn');

const endSection = document.getElementById('endSection');
const winnerText = document.getElementById('winnerText');
const winnerNameInput = document.getElementById('winnerName');
const saveWinnerBtn = document.getElementById('saveWinnerBtn');
const highscoreList = document.getElementById('highscoreList');

// Render poäng
function render() {
  totalEls.forEach((el, i) => el.textContent = totals[i]);
  currentEls.forEach((el, i) => el.textContent = currents[i]);
}

// ------------------ Tärningskast ------------------
function rollDice() {
  if (!playing) return;
  const roll = Math.floor(Math.random() * 6) + 1;
  currents[active] += roll;

  if (totals[active] + currents[active] > BUST_LIMIT) {
    endGame(active ^ 1, `Spelare ${active + 1} gick över ${BUST_LIMIT}!`);
    return;
  }
  render();
}

// ------------------ Stanna / Hold ------------------
function hold() {
  if (!playing) return;
  totals[active] += currents[active];
  currents[active] = 0;

  if (totals[active] >= WIN_LIMIT) {
    endGame(active, `Nådd ${totals[active]} poäng!`);
    return;
  }

  active = active ^ 1; // Byt tur
  render();
}

// ------------------ Nytt spel ------------------
function newGame() {
  totals = [0, 0];
  currents = [0, 0];
  active = 0;
  playing = true;
  endSection.hidden = true;
  render();
}

// ------------------ Avsluta spel ------------------
function endGame(winnerIndex, message = '') {
  playing = false;
  winnerText.textContent = `Vinnare: Spelare ${winnerIndex + 1}. ${message}`;
  endSection.hidden = false;
  winnerNameInput.placeholder = `Spelare ${winnerIndex + 1}`;
}

// ------------------ Highscore ------------------
saveWinnerBtn.addEventListener('click', () => {
  const name = winnerNameInput.value.trim() || `Spelare ${active + 1}`;
  const hs = JSON.parse(localStorage.getItem('webChickenHighscores') || '{}');
  hs[name] = (hs[name] || 0) + 1;
  localStorage.setItem('webChickenHighscores', JSON.stringify(hs));
  endSection.hidden = true;
  newGame();
  loadHighscores();
});

function loadHighscores() {
  const hs = JSON.parse(localStorage.getItem('webChickenHighscores') || '{}');
  const entries = Object.entries(hs).sort((a, b) => b[1] - a[1]);
  highscoreList.innerHTML = entries.length
    ? entries.map(([n, v]) => `<li>${n} — ${v} vinster</li>`).join('')
    : '<li>Ingen highscore ännu</li>';
}

// ------------------ Event listeners ------------------
rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', hold);
newBtn.addEventListener('click', newGame);

// Init
newGame();
loadHighscores();
