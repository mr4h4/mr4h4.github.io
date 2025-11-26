const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// VARIABLES DE LA MATRIX (deben ir arriba)
const fontSize = 14;
const characters = '0110カ0110キ0110ケ0110サ0110ス0110セ0110';
let columns;
let drops;

// FUNCIONES =========================================================

function initMatrix() {
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns)
    .fill()
    .map(() => Math.floor(Math.random() * canvas.height / fontSize));
}

function resizeCanvas() {
  const headerHeight = document.querySelector('header')?.offsetHeight || 0;

  // Altura REAL del documento completo (con scroll)
  const fullHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  );

  canvas.width = window.innerWidth;
  canvas.height = fullHeight - headerHeight;

  initMatrix();
}

// EJECUTAR DESPUÉS DE DECLARAR VARIABLES
resizeCanvas();

// OBSERVADORES =====================================================
document.getElementById("menu-label").addEventListener("click", () => {
    // Esperamos un pelín para que el menú termine de abrirse
    setTimeout(() => {
        resizeCanvas();
    }, 50);
});
document.getElementById("toggle-upgrades").addEventListener("click", () => {
    // Esperamos un pelín para que el menú termine de abrirse
    setTimeout(() => {
        resizeCanvas();
    }, 50);
});
document.getElementById("toggle-achievements").addEventListener("click", () => {
    // Esperamos un pelín para que el menú termine de abrirse
    setTimeout(() => {
        resizeCanvas();
    }, 50);
});

const observer = new ResizeObserver(resizeCanvas);
observer.observe(document.documentElement);

// MATRIX DRAW =======================================================

function draw() {
  ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = window.matrixColor || '#ff7300ff';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const char = characters[Math.floor(Math.random() * characters.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(draw, 50);
