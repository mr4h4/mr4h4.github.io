const balon = document.getElementById("balon");
const portero = document.getElementById("portero");
const marcador = document.getElementById("marcador");
const turnoTexto = document.getElementById("turnoTexto");
const floatingText = document.getElementById("floatingText");

const overlay = document.getElementById("overlay");
const overlayEmoji = document.getElementById("overlayEmoji");
const overlayText = document.getElementById("overlayText");
const overlayBtn = document.getElementById("overlayBtn");
const nameInputs = document.getElementById("nameInputs");

const snd = {
  click: new Audio("sounds/click.mp3"),
  kick: new Audio("sounds/kick.mp3"),
  goal: new Audio("sounds/goal.mp3"),
  fail: new Audio("sounds/fail.mp3")
};

let jugadores = ["", ""];
let goles = [0, 0];
let tiros = [0, 0];
let turno = 0;
let eleccion = "";

window.onload = pedirNombres;

function play(sound) {
  snd[sound].currentTime = 0;
  snd[sound].play();
}

function ocultarInputs() {
  nameInputs.style.display = "none";
}

function pedirNombres() {
  overlay.style.display = "flex";
  overlayEmoji.textContent = "✍️";
  overlayText.textContent = "Introduce los nombres";
  overlayBtn.textContent = "Empezar";

  overlayBtn.onclick = () => {
    play("click");
    jugadores[0] = name1.value || "Jugador 1";
    jugadores[1] = name2.value || "Jugador 2";
    overlay.style.display = "none";
    actualizarMarcador();
    actualizarTurno();
  };
}

function elegir(lado) {
  play("click");

  if (turno === 0) {
    eleccion = lado;
    mostrarPasarMovil();
    turno = 1;
  } else {
    resolver(lado);
  }
}

function mostrarPasarMovil() {
  ocultarInputs();

  overlay.style.display = "flex";
  overlayEmoji.textContent = "🤝📱";
  overlayText.textContent = "Pasa el móvil al otro jugador";
  overlayBtn.textContent = "Continuar";

  overlayBtn.onclick = () => {
    play("click");
    overlay.style.display = "none";
  };
}


function resolver(porteroLado) {
  play("kick");
  animarTiro(eleccion);
  animarPortero(porteroLado);

  setTimeout(() => {
    const tirador = (tiros[0] + tiros[1]) % 2;
    const gol = eleccion !== porteroLado;

    if (gol) {
      goles[tirador]++;
      play("goal");
      mostrarFloating("GOAL", "#00e676");
    } else {
      play("fail");
      mostrarFloating("FAIL", "#ff5252");
    }

    tiros[tirador]++;
    actualizarMarcador();
    resetearAnimacion();
    turno = 0;
    actualizarTurno();

    // ⬇️ NUEVO: tras GOAL/FAIL vuelve a pasar el móvil
    setTimeout(() => {
      if (finJuego()) {
        mostrarGanador();
      } else {
        mostrarPasarMovil();
      }
    }, 900);

  }, 600);
}

function animarTiro(lado) {
  balon.style.bottom = "65%";
  balon.style.left =
    lado === "izquierda" ? "30%" :
    lado === "derecha" ? "70%" : "50%";
}

function animarPortero(lado) {
  portero.style.left =
    lado === "izquierda" ? "35%" :
    lado === "derecha" ? "65%" : "50%";
}

function resetearAnimacion() {
  setTimeout(() => {
    balon.style.bottom = "8%";
    balon.style.left = "50%";
    portero.style.left = "50%";
  }, 200);
}

function mostrarFloating(texto, color) {
  floatingText.textContent = texto;
  floatingText.style.color = color;
  floatingText.style.opacity = 1;
  floatingText.style.transform = "translate(-50%, -60%)";
  setTimeout(() => {
    floatingText.style.opacity = 0;
    floatingText.style.transform = "translate(-50%, -40%)";
  }, 800);
}

function actualizarMarcador() {
  marcador.textContent = `${jugadores[0]} ${goles[0]}:${goles[1]} ${jugadores[1]}`;
}

function actualizarTurno() {
  turnoTexto.textContent = turno === 0
    ? "Turno del tirador"
    : "Turno del portero";
}

function finJuego() {
  const max = Math.max(tiros[0], tiros[1]);
  const diff = Math.abs(goles[0] - goles[1]);
  return max < 5 ? diff > (5 - max) : tiros[0] + tiros[1] >= 10 && diff > 0;
}

function mostrarGanador() {
  ocultarInputs();

  overlay.style.display = "flex";
  overlayEmoji.textContent = "🏆";
  overlayText.textContent =
    `Gana ${goles[0] > goles[1] ? jugadores[0] : jugadores[1]}`;
  overlayBtn.textContent = "Volver a jugar";

  overlayBtn.onclick = () => {
    play("click");
    location.reload();
  };
}

