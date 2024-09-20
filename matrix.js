// Obtener el elemento body
const body = document.body;

// Establecer los caracteres de lluvia (ceros y unos)
const rainChars = ['0', '1'];

// Establecer el color de lluvia 
const rainColor = 'green';

// Establecer la velocidad de lluvia (ajusta a tu gusto)
const rainSpeed = 200; // milisegundos

// Crear una función para generar una gota de lluvia
function createRainDrop() {
  // Crear un nuevo elemento span para la gota de lluvia
  const rainDrop = document.createElement('span');

  // Establecer el contenido de texto de la gota de lluvia a un cero o uno aleatorio
  rainDrop.textContent = rainChars[Math.floor(Math.random() * rainChars.length)];

  // Establecer el color de la gota de lluvia a verde
  rainDrop.style.color = rainColor;

  // Establecer el tamaño de fuente de la gota de lluvia a un valor aleatorio entre 10 y 20 píxeles
  rainDrop.style.fontSize = `${Math.floor(Math.random() * 11) + 10}px`;

  // Establecer la posición de la gota de lluvia a una coordenada x aleatoria y una coordenada y de 0
  rainDrop.style.top = '0px';
  rainDrop.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;

  // Agregar la gota de lluvia al elemento body
  body.appendChild(rainDrop);

  // Establecer un temporizador para eliminar la gota de lluvia después de un breve período
  setTimeout(() => {
    body.removeChild(rainDrop);
  }, 700);
}

// Crear una función para generar gotas de lluvia a intervalos
function generateRain() {
  setInterval(createRainDrop, 25);
}

// Llamar a la función generateRain para iniciar el efecto de lluvia
generateRain();