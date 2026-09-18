const square = document.querySelector('.square');
const squareFill = document.querySelector('.square-fill');
const fillStatus = document.querySelector('.fill-status');
const fillButtons = document.querySelectorAll('.fill-button');

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
