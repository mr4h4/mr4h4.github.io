const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - document.querySelector('header').offsetHeight;
  
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns)
  .fill()
  .map(() => Math.floor(Math.random() * canvas.height / fontSize));
const characters = '0110カ0110キ0110ケ0110サ0110ス0110セ0110';

function draw() {
ctx.fillStyle = 'rgba(13, 17, 23, 0.05)'; //Fondo semitransparente
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = window.matrixColor || '#ff7300ff'; // usa el color actual del Bitcoin
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const char = characters[Math.floor(Math.random() * characters.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);

    // Reinicia gota aleatoriamente cuando llega al fondo
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(draw, 50);