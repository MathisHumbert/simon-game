// get elements
const panels = document.querySelectorAll('.panel');
const start = document.querySelector('.play');

// initilize var
let memory = [];
let startFlag = true;

// event
start.addEventListener('click', launchGame);
panels.forEach((panel) => {
  panel.addEventListener('click', () => {
    displayColor(panel);
  });
  // panel.addEventListener('click');
});

function launchGame() {
  // if (!startFlag) return;
  let random = Math.floor(Math.random() * 4 + 1);
  memory.push(random);
  memory.forEach((item, i) =>
    setTimeout(() => {
      panels.forEach((panel) => {
        if (panel.dataset.id == item) {
          displayColor(panel);
        }
      });
    }, i * 1000)
  );
}

// display the color
function displayColor(panel) {
  panel.classList.add('active');
  setTimeout(() => {
    panel.classList.remove('active');
  }, 500);
}

// if (!startFlag) return;
// let random = Math.floor(Math.random() * 4 + 1);
// memory.push(random);
// panels.forEach((panel) => {
//   if (panel.dataset.id == random) {
//     displayColor(panel);
//   }
// });
// startFlag = false;
