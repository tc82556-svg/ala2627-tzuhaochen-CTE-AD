const square = document.querySelector('.square');
const squareFill = document.querySelector('.square-fill');
const fillStatus = document.querySelector('.fill-status');
const fillButtons = document.querySelectorAll('.fill-button');
const responseForm = document.querySelector('.response-form');
const blankAnswer = document.querySelector('#blank-answer');
const responseStatus = document.querySelector('.response-status');
const goodStuffButton = document.querySelector('.good-stuff-button');
const watchConfirmation = document.querySelector('.watch-confirmation');
const watchChoices = document.querySelectorAll('.watch-choice');
const vehicleArena = document.querySelector('.vehicle-arena');
const vehicles = [
  {
    element: document.querySelector('.vehicle-wasd'),
    keys: { up: 'w', left: 'a', down: 's', right: 'd' },
    x: 24,
    y: 24,
  },
  {
    element: document.querySelector('.vehicle-arrows'),
    keys: { up: 'ArrowUp', left: 'ArrowLeft', down: 'ArrowDown', right: 'ArrowRight' },
    x: 170,
    y: 124,
  },
];

fillButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const fill = Number(button.dataset.fill);

    squareFill.style.height = `${fill}%`;
    square.setAttribute('aria-label', `500 by 500 pixel square, ${fill} percent filled`);
    fillStatus.textContent = `Filled: ${fill}%`;
    fillButtons.forEach((fillButton) => {
      fillButton.setAttribute('aria-pressed', String(fillButton === button));
    });
  });
});

responseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  responseStatus.textContent = `Confirmed: ${blankAnswer.value.trim()}`;
});

goodStuffButton.addEventListener('click', () => {
  watchConfirmation.hidden = false;
  goodStuffButton.hidden = true;
});

watchChoices.forEach((choice) => {
  choice.addEventListener('click', () => {
    if (choice.dataset.watch === 'yes') {
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      return;
    }

    window.location.href = 'index.html';
  });
});

function moveVehicle(vehicle, direction) {
  const step = 8;
  const maxX = vehicleArena.clientWidth - vehicle.element.offsetWidth;
  const maxY = vehicleArena.clientHeight - vehicle.element.offsetHeight;

  if (direction === 'up') vehicle.y -= step;
  if (direction === 'left') vehicle.x -= step;
  if (direction === 'down') vehicle.y += step;
  if (direction === 'right') vehicle.x += step;

  vehicle.x = Math.max(0, Math.min(vehicle.x, maxX));
  vehicle.y = Math.max(0, Math.min(vehicle.y, maxY));
  vehicle.element.style.transform = `translate(${vehicle.x}px, ${vehicle.y}px)`;
}

vehicleArena.addEventListener('keydown', (event) => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  const vehicle = vehicles.find((candidate) => Object.values(candidate.keys).includes(key));

  if (!vehicle) return;

  event.preventDefault();
  const direction = Object.keys(vehicle.keys).find((name) => vehicle.keys[name] === key);
  moveVehicle(vehicle, direction);
});

vehicles.forEach((vehicle) => {
  vehicle.element.style.transform = `translate(${vehicle.x}px, ${vehicle.y}px)`;
});
