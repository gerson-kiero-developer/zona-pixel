const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  nav.classList.toggle('is-open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
    nav.classList.remove('is-open');
  });
});

const gameDetails = {
  minecraft: { title: 'Minecraft', text: 'Tu mundo, tus reglas. Explora biomas, reúne recursos y construye algo increíble bloque a bloque.' },
  among: { title: 'Among Us', text: 'La tripulación necesita ayuda. Completa tareas, convoca reuniones y presta atención a cada sospechoso.' },
  clash: { title: 'Clash Royale', text: 'Elige tus cartas, calcula el momento perfecto y lucha por las torres en la arena.' }
};
const dialog = document.querySelector('.game-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogDescription = document.querySelector('.dialog-description');

document.querySelectorAll('.explore-button').forEach((button) => {
  button.addEventListener('click', () => {
    const game = gameDetails[button.dataset.game];
    dialogTitle.textContent = game.title;
    dialogDescription.textContent = game.text;
    dialog.showModal();
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('.dialog-okay').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
const wheelCanvas = document.querySelector('#game-wheel');
const wheelContext = wheelCanvas.getContext('2d');
const wheelGames = [
  { name: 'Minecraft', color: '#68a747', icon: '⛏️' },
  { name: 'Among Us', color: '#d84d60', icon: '🚀' },
  { name: 'Clash Royale', color: '#347bc4', icon: '👑' }
];
const sliceAngle = (Math.PI * 2) / wheelGames.length;
let wheelAngle = -Math.PI / 2;
let wheelSpinning = false;

function drawWheel() {
  const context = wheelContext;
  const center = wheelCanvas.width / 2;
  const radius = center - 12;
  context.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
  wheelGames.forEach((game, index) => {
    const start = wheelAngle + index * sliceAngle;
    const end = start + sliceAngle;
    context.beginPath();
    context.moveTo(center, center);
    context.arc(center, center, radius, start, end);
    context.closePath();
    context.fillStyle = game.color;
    context.fill();
    context.strokeStyle = '#10151c';
    context.lineWidth = 7;
    context.stroke();
    context.save();
    context.translate(center, center);
    context.rotate(start + sliceAngle / 2);
    context.textAlign = 'right';
    context.fillStyle = '#ffffff';
    context.font = '700 19px "DM Sans", sans-serif';
    context.shadowColor = '#0008';
    context.shadowBlur = 4;
    context.fillText(`${game.icon}  ${game.name}`, radius - 25, 7, radius * 0.72);
    context.restore();
  });
  context.beginPath();
  context.arc(center, center, radius, 0, Math.PI * 2);
  context.strokeStyle = '#e5eaf0';
  context.lineWidth = 5;
  context.stroke();
}

drawWheel();
window.addEventListener('resize', drawWheel);

const spinButton = document.querySelector('#spin-button');
const spinResult = document.querySelector('#spin-result');
spinButton.addEventListener('click', () => {
  if (wheelSpinning) return;
  wheelSpinning = true;
  spinButton.disabled = true;
  spinResult.textContent = 'Girando…';
  const selectedIndex = Math.floor(Math.random() * wheelGames.length);
  const selectedGame = wheelGames[selectedIndex];
  const current = wheelAngle;
  const desired = -Math.PI / 2 - (selectedIndex * sliceAngle + sliceAngle / 2);
  const delta = ((desired - current) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
  const destination = current + Math.PI * 2 * 6 + delta;
  const startTime = performance.now();
  const duration = 4200;

  function animateWheel(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    wheelAngle = current + (destination - current) * eased;
    drawWheel();
    if (progress < 1) {
      requestAnimationFrame(animateWheel);
      return;
    }
    wheelAngle = destination % (Math.PI * 2);
    drawWheel();
    wheelSpinning = false;
    spinButton.disabled = false;
    spinResult.textContent = `¡La ruleta eligió ${selectedGame.name}!`;
  }
  requestAnimationFrame(animateWheel);
});
const movieDetails = {
  fast: { title: 'Rápidos y Furiosos', text: 'Acción, carreras y una familia que siempre vuelve a reunirse. Una opción perfecta para una noche llena de adrenalina.' },
  vertigo: { title: 'Vértigo 2', text: 'Una aventura cargada de tensión y emociones para quienes quieren una historia intensa.' },
  meg: { title: 'Megalodón 1 y 2', text: 'Dos aventuras en aguas profundas con un enorme tiburón prehistórico y mucho suspenso.' }
};
document.querySelectorAll('.movie-button').forEach((button) => {
  button.addEventListener('click', () => {
    const movie = movieDetails[button.dataset.movie];
    dialogTitle.textContent = movie.title;
    dialogDescription.textContent = movie.text;
    dialog.showModal();
  });
});
