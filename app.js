// get elements
const panels = document.querySelectorAll('.panel');
const start = document.querySelector('.play');

// initilize var
let memory = [];
let counter = 0;
let startFlag = true;
let showFlag = true;

// event
start.addEventListener('click', launchGame);
panels.forEach((panel) => {
  panel.addEventListener('click', userResponse);
});

// start the game
function launchGame() {
  if (!startFlag) return;
  let random = Math.floor(Math.random() * 4 + 1);
  memory.push(random);
  panels.forEach((panel) => {
    if (panel.dataset.id == random) {
      displayColor(panel);
    }
  });
  startFlag = false;
}

// display the color
function displayColor(panel) {
  panel.classList.add('active');
  setTimeout(() => {
    panel.classList.remove('active');
  }, 500);
}

// user playing the game
function userResponse() {
  // if the start button has not been pressed
  if (startFlag) return;
  // if the game is showing the newt moves
  if (!showFlag) return;

  displayColor(this);

  // if the player is wrong
  if (!(this.dataset.id == memory[counter])) {
    console.log('error');
    return;
  }

  // if the player is right and if he has done all of the steps
  if (counter + 1 == memory.length) {
    showFlag = false;

    // launch a new set
    setTimeout(() => {
      // adding a new item to the memory
      let random = Math.floor(Math.random() * 4 + 1);
      memory.push(random);

      // displaying all of the actual memory in HTML
      memory.forEach((item, i) =>
        setTimeout(() => {
          panels.forEach((panel) => {
            if (panel.dataset.id == item) {
              displayColor(panel);
            }
            if (i + 1 == memory.length) {
              showFlag = true;
            }
          });
        }, i * 1250)
      );
    }, 2000);
    counter = 0;
  }

  // if the player is right but has not done all of the steps
  else {
    counter++;
  }
}
