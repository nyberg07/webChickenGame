let totals = [0, 0];       // totalpoäng för spelare 1 och 2
let currents = [0, 0];     // turpoäng för spelare 1 och 2
let active = 0;            // 0 = spelare 1, 1 = spelare 2
let playing = true;

const totalEls = [document.getElementById('total1'), document.getElementById('total2')];
const currentEls = [document.getElementById('current1'), document.getElementById('current2')];

const rollBtn = document.getElementById('rollBtn');
const holdBtn = document.getElementById('holdBtn');
const newBtn = document.getElementById('newBtn');

function render() {
  totalEls.forEach((el, i) => el.textContent = totals[i]);
  currentEls.forEach((el, i) => el.textContent = currents[i]);
}

// Kasta tärning
function rollDice() {
  if(!playing) return;
  const roll = Math.floor(Math.random()*6)+1;
  currents[active] += roll;

  // Bust: om summan överstiger 100
  if(totals[active] + currents[active] > 100){
    alert(`Spelare ${active+1} gick över 100!`);
    totals[active^1] += 0; // andra spelaren vinner (poäng kan justeras)
    newGame();
    return;
  }

  render();
}

// Stanna (hold)
function hold() {
  if(!playing) return;
  totals[active] += currents[active];
  currents[active] = 0;

  // Kontrollera om spelare vinner
  if(totals[active] >= 100){
    alert(`Spelare ${active+1} vann!`);
    newGame();
    return;
  }

  active = active ^ 1; // byt tur
  render();
}

// Nytt spel
function newGame() {
  totals = [0, 0];
  currents = [0, 0];
  active = 0;
  playing = true;
  render();
}

// Event listeners
rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', hold);
newBtn.addEventListener('click', newGame);

// init
newGame();

