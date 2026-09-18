const cuboid = document.querySelector('.cuboid');
const cuboidStatus = document.querySelector('.cuboid-status');
const sizeButtons = document.querySelectorAll('.size-button');

sizeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const scale = Number(button.dataset.scale);
    const length = 2000 * scale / 100;

    cuboid.style.width = `${length}px`;
    cuboidStatus.textContent = `Length: ${length} pixels | Width: 50 pixels`;
    sizeButtons.forEach((sizeButton) => {
      sizeButton.setAttribute('aria-pressed', String(sizeButton === button));
    });
  });
});
