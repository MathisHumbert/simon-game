// get elements
const panels = [...document.querySelectorAll('.panel')];
const powerDOM = document.querySelector('.power');
const strictDOM = document.querySelector('.strict');
const countDOM = document.querySelector('.count');
const startDOM = document.querySelector('.start');

// initilize var
let memory = [];
let player = [];
let power;
let strict;
let flash;
let count;
let noise = true;
let pressFlag;
let computerAction;

// display the color
function displayColor(panel) {
  if (noise) {
    let audio = document.querySelector(`.audio${panel.dataset.id}`);
    audio.play();
  }
  panel.classList.add('active');
  setTimeout(() => {
    panel.classList.remove('active');
  }, 500);
}

// start a new game
function startGame() {
  memory = [];
  player = [];
  noise = true;
  count = 1;
  flash = 0;
  pressFlag = false;
  countDOM.innerHTML = count;

  for (let i = 0; i <= 20; i++) {
    memory.push(Math.floor(Math.random() * 4 + 1));
  }
  computerAction = true;
  game = setInterval(showColor, 1000);
}

// show the display of colors
function showColor() {
  if (flash == count) {
    clearInterval(game);
    computerAction = false;
    pressFlag = true;
  }
  if (computerAction) {
    pressFlag = false;
    setTimeout(() => {
      panels.forEach((panel) => {
        if (memory[flash] == panel.dataset.id) {
          displayColor(panel);
        }
      });
      flash++;
    }, 200);
  }
}

// handle the player's action
function panelClick() {
  if (pressFlag) {
    player.push(this.dataset.id);
    displayColor(this);
    checkAnswer();
  }
}

// check id the answer of the player is the same as the memory
function checkAnswer() {}

panels.forEach((panel) => {
  panel.addEventListener('click', panelClick);
});

// handle the power button
powerDOM.addEventListener('click', () => {
  if (powerDOM.checked) {
    power = true;
    countDOM.innerHTML = 'GO';
  } else {
    power = false;
    countDOM.innerHTML = '';
  }
});

// handle the strict button
strictDOM.addEventListener('click', () => {
  if (strictDOM.checked) {
    strict = true;
  } else {
    strict = false;
  }
});

// start the game
startDOM.addEventListener('click', () => {
  if (power) {
    startGame();
  }
});
