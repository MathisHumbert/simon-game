// get elements
const panels = document.querySelectorAll('.panel');
const start = document.querySelector('.play');
const numberMoves = document.querySelector('.number-moves');
const movesDOM = document.querySelector('.moves');
const lostDOM = document.querySelector('.lost');
const startDOM = document.querySelector('.start-header');

// initilize var
let memory = [];
let counter = 0;
let moves = 0;
let startFlag = true;
let showFlag = true;

// display the color
function displayColor(panel) {
  panel.classList.add('active');
  setTimeout(() => {
    panel.classList.remove('active');
  }, 500);
}
