const gameContainer = document.getElementById('game-container');
const zone = document.getElementById('zone');
const scoreDisplay = document.getElementById('score');

let score = 0;
let zoneRadius = 50; // Initial radius of the zone
let zonePosition = { x: 0, y: 0 };
let isProcessing = false;

function randomPosition(radius) {
  // Allow the zone to go slightly outside the screen bounds
  const x = Math.random() * (window.innerWidth + radius * 2) - radius;
  const y = Math.random() * (window.innerHeight + radius * 2) - radius;
  return { x, y };
}

function updateZone() {
  zonePosition = randomPosition(zoneRadius);

  zone.style.width = `${zoneRadius * 2}px`;
  zone.style.height = `${zoneRadius * 2}px`;
  zone.style.left = `${zonePosition.x - zoneRadius}px`;
  zone.style.top = `${zonePosition.y - zoneRadius}px`;

  zone.style.visibility = 'hidden';
}

function handleClick(event) {
  if (isProcessing) return;
  isProcessing = true;

  const clickX = event.clientX;
  const clickY = event.clientY;

  zone.style.visibility = 'visible';

  const distance = Math.sqrt(
    Math.pow(clickX - zonePosition.x, 2) + Math.pow(clickY - zonePosition.y, 2)
  );

  setTimeout(() => {
    if (distance <= zoneRadius) {
      // Navigate to Game Over screen
      window.location.href = `game-over.html?score=${score}`;
    } else {
      score++;
      zoneRadius += 10;
      scoreDisplay.textContent = score;
      updateZone();
    }
    isProcessing = false;
  }, 1000);
}

updateZone();
gameContainer.addEventListener('click', handleClick);
