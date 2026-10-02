const gameBoard = document.querySelector('.game-board');
const gameBlock = document.querySelector('.game-block');
const step = 10;
let x = 40;
let y = 40;

gameBoard.addEventListener('keydown', (event) => {
  const directions = {
    ArrowUp: [0, -step],
    ArrowDown: [0, step],
    ArrowLeft: [-step, 0],
    ArrowRight: [step, 0],
  };
  const direction = directions[event.key];

  if (!direction) return;

  event.preventDefault();
  x = Math.max(0, Math.min(x + direction[0], 1000 - 50));
  y = Math.max(0, Math.min(y + direction[1], 1000 - 80));
  gameBlock.style.left = `${x}px`;
  gameBlock.style.top = `${y}px`;
});
