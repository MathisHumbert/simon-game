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
let good = true;
let win = false;
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

// display all the color
function displayAllColor() {
  panels.forEach((panel) => {
    panel.classList.add('active');
  });
}

// clearAllColor
function clearAllColor() {
  panels.forEach((panel) => {
    panel.classList.remove('active');
  });
}

// if the player win the game
function winGame() {
  displayAllColor();
  countDOM.innerHTML = 'WIN';
  pressFlag = false;
  win = true;
}

// start a new game
function startGame() {
  clearAllColor();
  memory = [];
  player = [];
  noise = true;
  good = true;
  win = false;
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
function checkAnswer() {
  // if the player is wrong
  if (player[player.length - 1] != memory[player.length - 1]) {
    good = false;
  }

  // if the player wins
  if (player.length == 4 && good == true) {
    winGame();
  }

  // if the player is wrong actions
  if (good == false) {
    // displaye err
    clearAllColor();
    displayAllColor();
    countDOM.innerHTML = 'ERR!';
    setTimeout(() => {
      countDOM.innerHTML = count;
      clearAllColor();

      // is strict mode on restart from zero
      if (strict) {
        startGame();
      }
      // restart from where we are
      else {
        computerAction = true;
        flash = 0;
        player = [];
        good = true;
        game = setInterval(showColor, 1000);
      }
    }, 1000);
  }

  // if player is true
  if (count == player.length && good && !win) {
    count++;
    player = [];
    computerAction = true;
    flash = 0;
    countDOM.innerHTML = count;
    game = setInterval(showColor, 1000);
  }
}

// All events

// handle panel click
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
