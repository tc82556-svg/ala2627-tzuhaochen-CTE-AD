const cursorStage = document.querySelector('#cursor-stage');
cursorStage.addEventListener('pointermove', (event) => {
  const bounds = cursorStage.getBoundingClientRect();
  cursorStage.style.setProperty('--cursor-x', `${event.clientX - bounds.left}px`);
  cursorStage.style.setProperty('--cursor-y', `${event.clientY - bounds.top}px`);
});

const tiltCard = document.querySelector('#tilt-card');
tiltCard.parentElement.addEventListener('pointermove', (event) => {
  const bounds = tiltCard.getBoundingClientRect();
  const rotateX = ((event.clientY - bounds.top) / bounds.height - .5) * -18;
  const rotateY = ((event.clientX - bounds.left) / bounds.width - .5) * 18;
  tiltCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  tiltCard.querySelector('.tilt-orbit').textContent = `${Math.round(Math.abs(rotateY))}°`;
});
tiltCard.parentElement.addEventListener('pointerleave', () => { tiltCard.style.transform = ''; });

const springButton = document.querySelector('#spring-button');
const springRing = document.querySelector('.spring-ring');
springButton.addEventListener('click', () => {
  springRing.classList.remove('is-rippling');
  void springRing.offsetWidth;
  springRing.classList.add('is-rippling');
  springButton.classList.add('is-pressed');
  setTimeout(() => springButton.classList.remove('is-pressed'), 180);
});

const kineticWord = document.querySelector('#kinetic-word');
kineticWord.addEventListener('click', () => kineticWord.classList.toggle('is-open'));

const dragStage = document.querySelector('#drag-stage');
const dragOrb = document.querySelector('#drag-orb');
let dragging = false;
dragOrb.addEventListener('pointerdown', (event) => { dragging = true; dragOrb.setPointerCapture(event.pointerId); });
dragOrb.addEventListener('pointerup', () => { dragging = false; });
dragOrb.addEventListener('pointermove', (event) => {
  if (!dragging) return;
  const bounds = dragStage.getBoundingClientRect();
  const x = Math.max(57, Math.min(bounds.width - 57, event.clientX - bounds.left));
  const y = Math.max(57, Math.min(bounds.height - 57, event.clientY - bounds.top));
  dragOrb.style.left = `${x - 57}px`;
  dragOrb.style.top = `${y - 57}px`;
  document.querySelector('#drag-x').textContent = Math.round((x / bounds.width) * 100);
  document.querySelector('#drag-y').textContent = Math.round((y / bounds.height) * 100);
});

const revealDoor = document.querySelector('#reveal-door');
revealDoor.addEventListener('click', () => {
  revealDoor.classList.toggle('is-open');
  revealDoor.querySelector('.door-label').textContent = revealDoor.classList.contains('is-open') ? 'close' : 'open';
});

const dotField = document.querySelector('#dot-field');
for (let index = 0; index < 60; index += 1) {
  const dot = document.createElement('span');
  dot.className = 'grid-dot';
  dot.style.setProperty('--i', index);
  dotField.append(dot);
}

const dial = document.querySelector('#dial');
let dialCount = 1;
dial.addEventListener('click', () => {
  dialCount = dialCount === 4 ? 1 : dialCount + 1;
  dial.querySelector('.dial-number').textContent = dialCount.toString().padStart(2, '0');
  dial.querySelector('.dial-knob').style.filter = `hue-rotate(${dialCount * 42}deg)`;
  dial.querySelector('.dial-knob').style.transform = `rotate(${dialCount * 12}deg) scale(${1 + dialCount * .03})`;
});

const observerShape = document.querySelector('.observer-shape');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) observerShape.classList.add('is-visible'); });
}, { threshold: .65 });
revealObserver.observe(observerShape);
