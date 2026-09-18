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
